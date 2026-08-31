import { describe, expect, it } from "vitest";
import AkeSearch from "@/pages/AkeSearch.vue";
import { MAX_OPERATORS } from "@/util/ake/searchLinks";

// Mirrors the valkyrie cap in tests/hi3/search.spec.ts. AkeSearch.vue is an Options API
// component, so its watchers are plain functions on the definition; calling one with a
// hand-built `this` exercises the real rule without mounting Vuetify or a DOM.
const options = AkeSearch as any;
const watchers = options.watch;

// A component instance stand-in: the real initial data, plus anything the test overrides.
const instance = (overrides: Record<string, any> = {}) => ({
  ...options.data(),
  ...overrides,
});

describe("operator selection rules", () => {
  // Real option names, taken from the data the dropdown is built from.
  const operatorNames: string[] = options.data().operators;
  const overCap = operatorNames.slice(0, MAX_OPERATORS + 1);

  // A full team is 4 operators, one more than the HI3 page's 3 valkyries. Unlike that
  // page there is no team option, so the cap is the only rule here — and the AKE watcher
  // takes just the new value, where the valk one also receives the previous selection.
  it(`caps operator selection at ${MAX_OPERATORS}`, () => {
    const vm = instance({ selectedOperators: overCap });
    watchers.selectedOperators.call(vm, overCap);
    expect(vm.selectedOperators).toEqual(overCap.slice(0, MAX_OPERATORS));
  });

  it(`allows exactly ${MAX_OPERATORS} operators`, () => {
    const full = operatorNames.slice(0, MAX_OPERATORS);
    const vm = instance({ selectedOperators: full });
    watchers.selectedOperators.call(vm, full);
    expect(vm.selectedOperators).toEqual(full);
  });

  it("leaves a shorter selection untouched", () => {
    const two = operatorNames.slice(0, 2);
    const vm = instance({ selectedOperators: two });
    watchers.selectedOperators.call(vm, two);
    expect(vm.selectedOperators).toEqual(two);
  });

  // The cap test needs one more operator than the cap allows. The data currently has
  // exactly five, so this guard fails loudly if that ever shrinks, rather than letting
  // the case above silently stop testing the cap.
  it("found enough real operators to exceed the cap", () => {
    expect(overCap).toHaveLength(MAX_OPERATORS + 1);
  });
});
