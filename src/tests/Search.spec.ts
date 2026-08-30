import { afterEach, describe, expect, it } from "vitest";
import Search from "@/pages/Search.vue";

// Search.vue is an Options API component, so its methods, computeds and watchers are
// plain functions on the component definition. Calling them with a hand-built `this`
// exercises the real UI rules without mounting Vuetify or a DOM.
const options = Search as any;
const methods = options.methods;
const computed = options.computed;
const watchers = options.watch;

// A component instance stand-in: the real initial data, plus anything the test overrides.
const instance = (overrides: Record<string, any> = {}) => ({
  ...options.data(),
  ...overrides,
});

describe("displayLink", () => {
  const display = (link: string) => methods.displayLink(link);

  it("shows only the search terms, dropping host and params", () => {
    expect(display("https://search.bilibili.com/all?keyword=终&order=pubdate")).toBe("终");
  });

  it("drops the date-range params along with the sort param", () => {
    const link =
      "https://search.bilibili.com/all?keyword=终&order=pubdate&pubtime_begin_s=1&pubtime_end_s=2";
    expect(display(link)).toBe("终");
  });

  it("renders term separators as spaces", () => {
    expect(display("https://search.bilibili.com/all?keyword=红莲+终+40000&order=pubdate")).toBe(
      "红莲 终 40000"
    );
  });

  it("decodes %2B back into a literal + for display", () => {
    expect(display("https://search.bilibili.com/all?keyword=全S0%2B1终&order=pubdate")).toBe(
      "全S0+1终"
    );
  });

  it("decodes a rank synergy's encoded + too", () => {
    expect(display("https://search.bilibili.com/all?keyword=S1%2B1终&order=pubdate")).toBe(
      "S1+1终"
    );
  });

  it("does not truncate a term containing an ampersand", () => {
    // The cut matches the whole &order=pubdate literal, not a bare "&".
    expect(display("https://search.bilibili.com/all?keyword=A&B+boss&order=pubdate")).toBe(
      "A&B boss"
    );
  });

  it("returns the input unchanged when there is no keyword param", () => {
    expect(display("not-a-link")).toBe("not-a-link");
  });

  it("round-trips the mobile host as well", () => {
    expect(display("https://m.bilibili.com/search?keyword=终&order=pubdate")).toBe("终");
  });
});

describe("onScoreKeydown", () => {
  // Returns whether the keystroke was blocked.
  const press = (key: string, modifiers: Partial<KeyboardEvent> = {}) => {
    let prevented = false;
    methods.onScoreKeydown({
      key,
      ctrlKey: false,
      metaKey: false,
      altKey: false,
      ...modifiers,
      preventDefault: () => {
        prevented = true;
      },
    } as unknown as KeyboardEvent);
    return prevented;
  };

  it.each(["0", "5", "9"])("allows the digit %s", (digit) => {
    expect(press(digit)).toBe(false);
  });

  it.each(["a", "-", ".", " ", "+"])("blocks the non-digit %s", (key) => {
    expect(press(key)).toBe(true);
  });

  it.each(["Backspace", "ArrowLeft", "Delete", "Tab", "Enter"])("allows %s", (key) => {
    expect(press(key)).toBe(false);
  });

  it("allows shortcuts like Ctrl+A and Cmd+V", () => {
    expect(press("a", { ctrlKey: true })).toBe(false);
    expect(press("v", { metaKey: true })).toBe(false);
    expect(press("a", { altKey: true })).toBe(false);
  });
});

describe("onModifierToggle", () => {
  const groupOf = (type: string) => ({
    type,
    items: [
      { name: "A", value: false },
      { name: "B", value: false },
      { name: "C", value: false },
    ],
  });

  it("clears the other options when checking one in a single-choice category", () => {
    const group = groupOf("single-choice");
    group.items[0].value = true;
    group.items[1].value = true;
    methods.onModifierToggle(group, group.items[1], true);
    expect(group.items.map((i) => i.value)).toEqual([false, true, false]);
  });

  it("leaves the others alone when unchecking in a single-choice category", () => {
    const group = groupOf("single-choice");
    group.items[0].value = true;
    methods.onModifierToggle(group, group.items[1], false);
    expect(group.items[0].value).toBe(true);
  });

  it("allows any number of selections in a multiple-choice category", () => {
    const group = groupOf("multiple-choice");
    group.items[0].value = true;
    group.items[2].value = true;
    methods.onModifierToggle(group, group.items[2], true);
    expect(group.items.map((i) => i.value)).toEqual([true, false, true]);
  });
});

describe("selection caps", () => {
  it("caps boss selection at one", () => {
    const vm = instance({ selectedBoss: ["A", "B"] });
    watchers.selectedBoss.call(vm, ["A", "B"]);
    expect(vm.selectedBoss).toEqual(["A"]);
  });

  it("caps weather selection at one", () => {
    const vm = instance({ selectedWeather: ["A", "B"] });
    watchers.selectedWeather.call(vm, ["A", "B"]);
    expect(vm.selectedWeather).toEqual(["A"]);
  });

  it("caps companion selection at one", () => {
    const vm = instance({ selectedCompanion: ["A", "B"] });
    watchers.selectedCompanion.call(vm, ["A", "B"]);
    expect(vm.selectedCompanion).toEqual(["A"]);
  });

  it("leaves a single selection untouched", () => {
    const vm = instance({ selectedBoss: ["A"] });
    watchers.selectedBoss.call(vm, ["A"]);
    expect(vm.selectedBoss).toEqual(["A"]);
  });
});

describe("valkyrie selection rules", () => {
  // Real option names, so isTeamValk() and the group lookups resolve.
  const valkNames: string[] = options.data().valks;
  const teamName = valkNames.find((v: string) => v.includes("Trio"));
  const plainValks = valkNames.filter((v: string) => !v.includes("Trio")).slice(0, 4);

  it("caps ordinary valk selection at three", () => {
    const vm = instance({ selectedValks: plainValks });
    watchers.selectedValks.call(vm, plainValks, plainValks.slice(0, 3));
    expect(vm.selectedValks).toEqual(plainValks.slice(0, 3));
  });

  it("allows exactly three valks", () => {
    const three = plainValks.slice(0, 3);
    const vm = instance({ selectedValks: three });
    watchers.selectedValks.call(vm, three, three.slice(0, 2));
    expect(vm.selectedValks).toEqual(three);
  });

  it("rejects adding anything alongside a team", () => {
    const previous = [teamName!];
    const attempted = [teamName!, plainValks[0]];
    const vm = instance({ selectedValks: attempted });
    watchers.selectedValks.call(vm, attempted, previous);
    expect(vm.selectedValks).toEqual(previous);
  });

  it("rejects adding a team alongside existing valks", () => {
    const previous = plainValks.slice(0, 2);
    const attempted = [...previous, teamName!];
    const vm = instance({ selectedValks: attempted });
    watchers.selectedValks.call(vm, attempted, previous);
    expect(vm.selectedValks).toEqual(previous);
  });

  it("allows a team on its own", () => {
    const vm = instance({ selectedValks: [teamName!] });
    watchers.selectedValks.call(vm, [teamName!], []);
    expect(vm.selectedValks).toEqual([teamName!]);
  });

  it("prunes rank and synergy state for deselected valks", () => {
    const [kept, dropped] = plainValks;
    const vm = instance({
      selectedValks: [kept],
      valkRanks: { [kept]: "S1", [dropped]: "S3" },
      valkSynergies: { [kept]: "+1", [dropped]: "+2" },
    });
    watchers.selectedValks.call(vm, [kept], [kept, dropped]);
    expect(vm.valkRanks).toEqual({ [kept]: "S1" });
    expect(vm.valkSynergies).toEqual({ [kept]: "+1" });
  });

  it("does not prune when the selection is rejected", () => {
    // The over-cap branch returns early, leaving state for the next (corrected) run.
    const vm = instance({ selectedValks: plainValks, valkRanks: { [plainValks[3]]: "S1" } });
    watchers.selectedValks.call(vm, plainValks, plainValks.slice(0, 3));
    expect(vm.valkRanks).toEqual({ [plainValks[3]]: "S1" });
  });

  // The cases above are only meaningful if the data still yields these fixtures.
  it("found real fixtures to test with", () => {
    expect(teamName).toBeTruthy();
    expect(plainValks).toHaveLength(4);
  });
});

describe("companion rank pruning", () => {
  const companionNames: string[] = Search ? (options.data().companions as string[]) : [];

  it("drops a rank that the newly selected companion's group does not define", () => {
    // An Astral Op rank (S/SS/SSS) cannot survive switching to an ELF (star ratings).
    const elf = companionNames.find((c) => c === "Klein")!;
    const vm = instance({ selectedCompanion: [elf], companionRank: "SSS" });
    watchers.selectedCompanion.call(vm, [elf]);
    expect(vm.companionRank).toBeNull();
  });

  it("keeps a rank the new companion's group still defines", () => {
    const elf = companionNames.find((c) => c === "Klein")!;
    const vm = instance({ selectedCompanion: [elf], companionRank: "★★" });
    watchers.selectedCompanion.call(vm, [elf]);
    expect(vm.companionRank).toBe("★★");
  });

  it("clears the rank when the companion is deselected entirely", () => {
    const vm = instance({ selectedCompanion: [], companionRank: "★★" });
    watchers.selectedCompanion.call(vm, []);
    expect(vm.companionRank).toBeNull();
  });
});

describe("score mode", () => {
  it("clears the picked score when the mode changes", () => {
    const vm = instance({ score: 40000 });
    watchers.scoreMode.call(vm);
    expect(vm.score).toBeNull();
  });

  it("offers a score list for each mode button", () => {
    for (const mode of options.data().scoreModes) {
      const vm = instance({ scoreMode: mode });
      expect(computed.scores.call(vm).length).toBe(45);
    }
  });

  it("expands SSS entries into combined 'sss / sssUp' values", () => {
    const vm = instance({ scoreMode: "SSS" });
    for (const score of computed.scores.call(vm)) {
      expect(String(score)).toMatch(/^\d+ \/ \d+$/);
    }
  });

  it("keeps SS entries as plain numbers", () => {
    const vm = instance({ scoreMode: "SS" });
    for (const score of computed.scores.call(vm)) {
      expect(typeof score).toBe("number");
    }
  });
});

describe("ranks & synergies modes", () => {
  const valkNames: string[] = options.data().valks;
  const valk = valkNames.find((v) => !v.includes("Trio"))!;

  // The rank buttons are hidden unless "assign individually" is ticked, so their values
  // must not reach the search either — otherwise a hidden pick silently alters the links.
  it("passes no ranks or synergies while the individual mode is off", () => {
    const vm = instance({
      individualRanks: false,
      valkRanks: { [valk]: "S1" },
      valkSynergies: { [valk]: "+1" },
    });
    expect(computed.effectiveValkRanks.call(vm)).toEqual({});
    expect(computed.effectiveValkSynergies.call(vm)).toEqual({});
  });

  it("passes the picked ranks and synergies while the individual mode is on", () => {
    const vm = instance({
      individualRanks: true,
      valkRanks: { [valk]: "S1" },
      valkSynergies: { [valk]: "+1" },
    });
    expect(computed.effectiveValkRanks.call(vm)).toEqual({ [valk]: "S1" });
    expect(computed.effectiveValkSynergies.call(vm)).toEqual({ [valk]: "+1" });
  });

  // Unticking hides the buttons but keeps the picks, so re-ticking restores them.
  it("keeps the underlying picks when the mode is switched off", () => {
    const vm = instance({
      individualRanks: false,
      valkRanks: { [valk]: "S1" },
    });
    expect(vm.valkRanks).toEqual({ [valk]: "S1" });
  });

  it("starts with both modes off", () => {
    const data = options.data();
    expect(data.allS0Plus1).toBe(false);
    expect(data.individualRanks).toBe(false);
  });
});

describe("valkRows", () => {
  it("returns one row per selected valk, in order", () => {
    const valkNames: string[] = options.data().valks;
    const picked = valkNames.filter((v) => !v.includes("Trio")).slice(0, 3);
    const rows = computed.valkRows.call(instance({ selectedValks: picked }));
    expect(rows.map((r: any) => r.valk)).toEqual(picked);
    for (const row of rows) {
      expect(Array.isArray(row.ranks)).toBe(true);
      expect(Array.isArray(row.synergies)).toBe(true);
    }
  });

  it("returns no rows when nothing is selected", () => {
    expect(computed.valkRows.call(instance())).toEqual([]);
  });
});

describe("the date filter on mobile", () => {
  // showDateFilter reads navigator.userAgent, so these need a window to sniff.
  const setUserAgent = (ua: string) => {
    (globalThis as any).window = { navigator: { userAgent: ua } };
  };
  const DESKTOP_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)";
  const MOBILE_UA = "Mozilla/5.0 (Linux; Android 14) Mobile Safari/537.36";

  afterEach(() => delete (globalThis as any).window);

  // Bilibili only honours pubtime_begin_s/pubtime_end_s on its desktop search, so the
  // checkbox is hidden rather than offered as a silent no-op.
  it("offers the checkbox on desktop", () => {
    setUserAgent(DESKTOP_UA);
    expect(computed.showDateFilter.call(instance())).toBe(true);
  });

  it("hides the checkbox on mobile", () => {
    setUserAgent(MOBILE_UA);
    expect(computed.showDateFilter.call(instance())).toBe(false);
  });

  // Belt and braces: even if filterByDate were somehow true on a phone, the filter must
  // not be applied, because m.bilibili.com and the app both drop the params.
  it("never applies the filter on mobile, even if the flag is set", () => {
    setUserAgent(MOBILE_UA);
    const vm = instance({ filterByDate: true });
    expect(computed.useDateFilter.call({ ...vm, showDateFilter: false })).toBe(false);
  });

  it("applies the filter on desktop when the box is checked", () => {
    setUserAgent(DESKTOP_UA);
    expect(computed.useDateFilter.call({ ...instance({ filterByDate: true }), showDateFilter: true })).toBe(
      true
    );
  });
});

describe("dateRangeLabel", () => {
  it("is null while the date filter is off, which hides the alert", () => {
    expect(computed.dateRangeLabel.call(instance({ useDateFilter: false }))).toBeNull();
  });

  it("returns a formatted CN date range when the filter is on", () => {
    const label = computed.dateRangeLabel.call(instance({ useDateFilter: true }));
    expect(label).toMatch(/^[A-Z][a-z]{2} \d{1,2}, \d{4} – [A-Z][a-z]{2} \d{1,2}, \d{4}$/);
  });

  it("is null on mobile even with the flag set, so the banner never shows there", () => {
    expect(computed.dateRangeLabel.call(instance({ useDateFilter: false, filterByDate: true }))).toBeNull();
  });
});
