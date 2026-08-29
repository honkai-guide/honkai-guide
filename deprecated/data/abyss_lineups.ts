import { Boss, Bosses } from "@/models/boss";
import { Weather, EXALTED_WEATHER } from "@/models/weather";
import { daysDifference } from "@/util/dates";

class AbyssLineup {
  id: number;
  date: Date;

  // Date the lineup appeared in CN, defaults to 4 weeks back.
  cnDate: Date;
  boss: Boss;
  weather: Weather;

  // Optional event name, boss will be ignored.
  event: string;

  constructor({
    date,
    cnDate,
    boss,
    weather,
    event,
  }: {
    date: Date;
    cnDate?: Date;
    boss?: Boss;
    weather?: Weather;
    event?: string;
  }) {
    this.id = Math.random();
    this.date = date;
    if (cnDate) {
      this.cnDate = cnDate;
    } else {
      this.cnDate = new Date(date);
      this.cnDate.setDate(this.cnDate.getDate() - 4 * 7);
    }
    if (event) {
      this.event = event;
    } else {
      this.boss = boss;
      this.weather = weather;
    }
  }
}

const ABYSS_LINEUPS = Object.freeze([
  new AbyssLineup({
    date: new Date("2020-09-15T00:00:00"),
    cnDate: new Date("2020-08-20T00:00:00"),
    event: "Patch 4.2",
  }),
  // 9/15 was BKE
  // 9/17 was BKE
  new AbyssLineup({
    date: new Date("2020-09-17T00:00:01"),
    cnDate: new Date("2020-08-20T00:00:00"),
    boss: Bosses.Nihilus,
    weather: EXALTED_WEATHER.Lightning,
  }),
  new AbyssLineup({
    date: new Date("2020-09-21T00:00:00"),
    cnDate: new Date("2020-08-31T00:00:00"),
    boss: Bosses.Benares,
    weather: EXALTED_WEATHER.Ice,
  }),
  new AbyssLineup({
    date: new Date("2020-09-24T00:00:00"),
    cnDate: new Date("2020-09-03T00:00:00"),
    boss: Bosses.Heimdall,
    weather: EXALTED_WEATHER.Fire,
  }),
  new AbyssLineup({
    date: new Date("2020-09-28T00:00:00"),
    cnDate: new Date("2020-09-07T00:00:00"),
    boss: Bosses.Nihilus,
    weather: EXALTED_WEATHER.Lightning,
  }),
  new AbyssLineup({
    date: new Date("2020-10-01T00:00:00"),
    cnDate: new Date("2020-09-10T00:00:00"),
    boss: Bosses.BKE,
    weather: EXALTED_WEATHER.Lightning,
  }),
  new AbyssLineup({
    date: new Date("2020-10-05T00:00:00"),
    cnDate: new Date("2020-09-14T00:00:00"),
    boss: Bosses.Huodou,
    weather: EXALTED_WEATHER.Ice,
  }),
  new AbyssLineup({
    date: new Date("2020-10-08T00:00:00"),
    cnDate: new Date("2020-09-17T00:00:00"),
    boss: Bosses.BKE,
    weather: EXALTED_WEATHER.Ice,
  }),
  new AbyssLineup({
    date: new Date("2020-10-12T00:00:00"),
    cnDate: new Date("2020-09-21T00:00:00"),
    boss: Bosses.Jizo,
    weather: EXALTED_WEATHER.Ice,
  }),
  // Started actually matching in 4.3
  new AbyssLineup({
    date: new Date("2020-10-29T00:00:00"),
    event: "Patch 4.3 (predicted)",
  }),
  new AbyssLineup({
    date: new Date("2020-12-03T00:00:00"),
    cnDate: new Date("2020-11-09T00:00:00"),
    boss: Bosses.SK,
    weather: EXALTED_WEATHER.TypeCounter,
  }),
  new AbyssLineup({
    date: new Date("2020-12-07T00:00:00"),
    cnDate: new Date("2020-11-12T00:00:00"),
    boss: Bosses.Heimdall,
    weather: EXALTED_WEATHER.Fire,
  }),
  new AbyssLineup({
    date: new Date("2020-12-10T00:00:00"),
    event: "Patch 4.4 (predicted)",
  }),
  new AbyssLineup({
    date: new Date("2020-12-11T00:00:00"),
    cnDate: new Date("2020-11-16T00:00:00"),
    boss: Bosses.Huodou,
    weather: EXALTED_WEATHER.TypeCounter,
  }),
  new AbyssLineup({
    date: new Date("2020-12-14T00:00:00"),
    cnDate: new Date("2020-11-19T00:00:00"),
    boss: Bosses.Nihilus,
    weather: EXALTED_WEATHER.Lightning,
  }),
  new AbyssLineup({
    date: new Date("2020-12-18T00:00:00"),
    cnDate: new Date("2020-11-23T00:00:00"),
    boss: Bosses.Rimestar,
    weather: EXALTED_WEATHER.Fire,
  }),
  new AbyssLineup({
    date: new Date("2020-12-21T00:00:00"),
    cnDate: new Date("2020-11-26T00:00:00"),
    boss: Bosses.Jizo,
    weather: EXALTED_WEATHER.Physical,
  }),
  new AbyssLineup({
    date: new Date("2020-12-25T00:00:00"),
    cnDate: new Date("2020-11-30T00:00:00"),
    boss: Bosses.Rimestar,
    weather: EXALTED_WEATHER.Fire,
  }),
  new AbyssLineup({
    date: new Date("2020-12-28T00:00:00"),
    cnDate: new Date("2020-12-03T00:00:00"),
    boss: Bosses.SK,
    weather: EXALTED_WEATHER.TypeCounter,
  }),
  new AbyssLineup({
    date: new Date("2020-12-31T00:00:00"),
    cnDate: new Date("2020-12-07T00:00:00"),
    boss: Bosses.Couatl,
    weather: EXALTED_WEATHER.Quantum,
  }),
  new AbyssLineup({
    date: new Date("2021-01-04T00:00:00"),
    cnDate: new Date("2020-12-10T00:00:00"),
    boss: Bosses.BKE,
    weather: EXALTED_WEATHER.Lightning,
  }),
  new AbyssLineup({
    date: new Date("2021-01-07T00:00:00"),
    cnDate: new Date("2020-12-14T00:00:00"),
    boss: Bosses.Benares,
    weather: EXALTED_WEATHER.Ice,
  }),
  new AbyssLineup({
    date: new Date("2021-01-11T00:00:00"),
    cnDate: new Date("2020-12-17T00:00:00"),
    boss: Bosses.Parvati,
    weather: EXALTED_WEATHER.Ignite,
  }),
  new AbyssLineup({
    date: new Date("2021-01-14T00:00:00"),
    cnDate: new Date("2020-12-21T00:00:00"),
    boss: Bosses.Huodou,
    weather: EXALTED_WEATHER.Ice,
  }),
  new AbyssLineup({
    date: new Date("2021-01-18T00:00:00"),
    cnDate: new Date("2020-12-24T00:00:00"),
    boss: Bosses.Jizo,
    weather: EXALTED_WEATHER.Physical,
  }),
  new AbyssLineup({
    date: new Date("2021-01-21T00:00:00"),
    event: "Patch 4.5 (predicted)",
  }),
  new AbyssLineup({
    date: new Date("2021-01-21T00:00:00"),
    cnDate: new Date("2020-12-28T00:00:00"),
    boss: Bosses.Benares,
    weather: EXALTED_WEATHER.Ice,
  }),
  new AbyssLineup({
    date: new Date("2021-01-25T00:00:00"),
    cnDate: new Date("2020-12-31T00:00:00"),
    boss: Bosses.Huodou,
    weather: EXALTED_WEATHER.Ice,
  }),
  new AbyssLineup({
    date: new Date("2021-01-28T00:00:00"),
    cnDate: new Date("2021-01-04T00:00:00"),
    boss: Bosses.SahaAssaka,
    weather: EXALTED_WEATHER.Physical,
  }),
  new AbyssLineup({
    date: new Date("2021-02-01T00:00:00"),
    cnDate: new Date("2021-01-07T00:00:00"),
    boss: Bosses.Couatl,
    weather: EXALTED_WEATHER.Quantum,
  }),
  new AbyssLineup({
    date: new Date("2021-02-04T00:00:00"),
    cnDate: new Date("2021-01-11T00:00:00"),
    boss: Bosses.DXY,
    weather: EXALTED_WEATHER.TypeCounter,
  }),
  new AbyssLineup({
    date: new Date("2021-02-08T00:00:00"),
    cnDate: new Date("2021-01-14T00:00:00"),
    boss: Bosses.Huodou,
    weather: EXALTED_WEATHER.Ice,
  }),
  new AbyssLineup({
    date: new Date("2021-02-11T00:00:00"),
    cnDate: new Date("2021-01-18T00:00:00"),
    boss: Bosses.Rimestar,
    weather: EXALTED_WEATHER.Fire,
  }),
  new AbyssLineup({
    date: new Date("2021-02-15T00:00:00"),
    cnDate: new Date("2021-01-21T00:00:00"),
    boss: Bosses.Jizo,
    weather: EXALTED_WEATHER.Physical,
  }),
  new AbyssLineup({
    date: new Date("2021-02-18T00:00:00"),
    cnDate: new Date("2021-01-25T00:00:00"),
    boss: Bosses.DXY,
    weather: EXALTED_WEATHER.TypeCounter,
  }),
  new AbyssLineup({
    date: new Date("2021-02-22T00:00:00"),
    cnDate: new Date("2021-01-28T00:00:00"),
    boss: Bosses.Tonatiuh,
    weather: EXALTED_WEATHER.Lightning,
  }),
  new AbyssLineup({
    date: new Date("2021-03-04T00:00:00"),
    event: "Patch 4.6",
  }),
  new AbyssLineup({
    date: new Date("2021-03-08T00:00:00"),
    boss: Bosses.Benares,
    weather: EXALTED_WEATHER.Ice,
  }),
  new AbyssLineup({
    date: new Date("2021-03-11T00:00:00"),
    boss: Bosses.HOMU,
    weather: EXALTED_WEATHER.Bloodlust,
  }),
  new AbyssLineup({
    date: new Date("2021-03-15T00:00:00"),
    boss: Bosses.Heimdall,
    weather: EXALTED_WEATHER.Fire,
  }),
  new AbyssLineup({
    date: new Date("2021-03-18T00:00:00"),
    boss: Bosses.DXY,
    weather: EXALTED_WEATHER.TypeCounter,
  }),
  new AbyssLineup({
    date: new Date("2021-03-22T00:00:00"),
    boss: Bosses.BKE,
    weather: EXALTED_WEATHER.Lightning,
  }),
  new AbyssLineup({
    date: new Date("2021-03-25T00:00:00"),
    boss: Bosses.Jizo,
    weather: EXALTED_WEATHER.Physical,
  }),
  new AbyssLineup({
    date: new Date("2021-03-29T00:00:00"),
    boss: Bosses.Rimestar,
    weather: EXALTED_WEATHER.Fire,
  }),
  new AbyssLineup({
    date: new Date("2021-04-01T00:00:00"),
    boss: Bosses.Benares,
    weather: EXALTED_WEATHER.Ice,
  }),
  new AbyssLineup({
    date: new Date("2021-04-05T00:00:00"),
    boss: Bosses.Tonatiuh,
    weather: EXALTED_WEATHER.Lightning,
  }),
  new AbyssLineup({
    date: new Date("2021-04-08T00:00:00"),
    boss: Bosses.Couatl,
    weather: EXALTED_WEATHER.Quantum,
  }),
  new AbyssLineup({
    date: new Date("2021-04-12T00:00:00"),
    boss: Bosses.Huodou,
    weather: EXALTED_WEATHER.Ice,
  }),
  new AbyssLineup({
    date: new Date("2021-04-15T00:00:00"),
    boss: Bosses.SK,
    weather: EXALTED_WEATHER.TypeCounter,
  }),
  new AbyssLineup({
    date: new Date("2021-04-19T00:00:00"),
    boss: Bosses.Nihilus,
    weather: EXALTED_WEATHER.Lightning,
  }),
  new AbyssLineup({
    date: new Date("2021-04-22T00:00:00"),
    event: "Patch 4.7 (predicted)",
  }),
  new AbyssLineup({
    date: new Date("2021-04-22T00:00:00"),
    boss: Bosses.Huodou,
    weather: EXALTED_WEATHER.Ice,
  }),
  new AbyssLineup({
    date: new Date("2021-04-26T00:00:00"),
    boss: Bosses.Benares,
    weather: EXALTED_WEATHER.Ice,
  }),
  new AbyssLineup({
    date: new Date("2021-04-29T00:00:00"),
    boss: Bosses.SahaAssaka,
    weather: EXALTED_WEATHER.Ranged,
  }),
  new AbyssLineup({
    date: new Date("2021-05-03T00:00:00"),
    boss: Bosses.Rimestar,
    weather: EXALTED_WEATHER.Fire,
  }),
  new AbyssLineup({
    date: new Date("2021-05-06T00:00:00"),
    boss: Bosses.BKE,
    weather: EXALTED_WEATHER.Lightning,
  }),
  new AbyssLineup({
    date: new Date("2021-05-10T00:00:00"),
    boss: Bosses.AKA,
    weather: EXALTED_WEATHER.Ignite,
  }),
  new AbyssLineup({
    date: new Date("2021-05-13T00:00:00"),
    boss: Bosses.Huodou,
    weather: EXALTED_WEATHER.Ice,
  }),
  new AbyssLineup({
    date: new Date("2021-05-17T00:00:00"),
    boss: Bosses.HoS,
    weather: EXALTED_WEATHER.TypeCounter,
  }),
  new AbyssLineup({
    date: new Date("2021-05-20T00:00:00"),
    boss: Bosses.Parvati,
    weather: EXALTED_WEATHER.Ignite,
  }),
  new AbyssLineup({
    date: new Date("2021-05-24T00:00:00"),
    boss: Bosses.DXY,
    weather: EXALTED_WEATHER.TypeCounter,
  }),
  new AbyssLineup({
    date: new Date("2021-05-27T00:00:00"),
    event: "Patch 4.8",
  }),
  new AbyssLineup({
    date: new Date("2021-05-27T00:00:01"),
    boss: Bosses.Couatl,
    weather: EXALTED_WEATHER.Quantum,
  }),
  new AbyssLineup({
    date: new Date("2021-05-31T00:00:00"),
    boss: Bosses.Benares,
    weather: EXALTED_WEATHER.Ice,
  }),
  new AbyssLineup({
    date: new Date("2021-06-03T00:00:00"),
    boss: Bosses.HOMU,
    weather: EXALTED_WEATHER.Bloodlust,
  }),
  new AbyssLineup({
    date: new Date("2021-06-07T00:00:00"),
    boss: Bosses.Couatl,
    weather: EXALTED_WEATHER.Quantum,
  }),
  new AbyssLineup({
    date: new Date("2021-06-10T00:00:00"),
    boss: Bosses.DXY,
    weather: EXALTED_WEATHER.TypeCounter,
  }),
  new AbyssLineup({
    date: new Date("2021-06-13T00:00:00"),
    boss: Bosses.Rimestar,
    weather: EXALTED_WEATHER.Fire,
  }),
  new AbyssLineup({
    date: new Date("2021-06-17T00:00:00"),
    boss: Bosses.BKE,
    weather: EXALTED_WEATHER.Lightning,
  }),
  new AbyssLineup({
    date: new Date("2021-06-21T00:00:00"),
    boss: Bosses.Couatl,
    weather: EXALTED_WEATHER.Quantum,
  }),
  new AbyssLineup({
    date: new Date("2021-06-24T00:00:00"),
    boss: Bosses.Heimdall,
    weather: EXALTED_WEATHER.Fire,
  }),
  new AbyssLineup({
    date: new Date("2021-06-28T00:00:00"),
    boss: Bosses.SahaAssaka,
    weather: EXALTED_WEATHER.Ranged,
  }),
  new AbyssLineup({
    date: new Date("2021-07-01T00:00:00"),
    boss: Bosses.Rimestar,
    weather: EXALTED_WEATHER.Fire,
  }),
  new AbyssLineup({
    date: new Date("2021-07-05T00:00:00"),
    boss: Bosses.Benares,
    weather: EXALTED_WEATHER.Ice,
  }),
  new AbyssLineup({
    date: new Date("2021-07-08T00:00:00"),
    event: "Patch 4.9",
  }),
  new AbyssLineup({
    date: new Date("2021-07-08T00:00:01"),
    boss: Bosses.Nihilus,
    weather: EXALTED_WEATHER.Lightning,
  }),
  new AbyssLineup({
    date: new Date("2021-07-12T00:00:00"),
    boss: Bosses.Benares,
    weather: EXALTED_WEATHER.Ice,
  }),
  new AbyssLineup({
    date: new Date("2021-07-15T00:00:00"),
    boss: Bosses.BKE,
    weather: EXALTED_WEATHER.Lightning,
  }),
  new AbyssLineup({
    date: new Date("2021-07-19T00:00:00"),
    boss: Bosses.HOMU,
    weather: EXALTED_WEATHER.Bloodlust,
  }),
  new AbyssLineup({
    date: new Date("2021-07-22T00:00:00"),
    boss: Bosses.DXY,
    weather: EXALTED_WEATHER.TypeCounter,
  }),
  new AbyssLineup({
    date: new Date("2021-07-26T00:00:00"),
    boss: Bosses.Nihilus,
    weather: EXALTED_WEATHER.Lightning,
  }),
  new AbyssLineup({
    date: new Date("2021-07-29T00:00:00"),
    boss: Bosses.Couatl,
    weather: EXALTED_WEATHER.Quantum,
  }),
  new AbyssLineup({
    date: new Date("2021-08-02T00:00:00"),
    boss: Bosses.Nihilus,
    weather: EXALTED_WEATHER.Lightning,
  }),
  new AbyssLineup({
    date: new Date("2021-08-05T00:00:00"),
    boss: Bosses.HoS,
    weather: EXALTED_WEATHER.TypeCounter,
  }),
  new AbyssLineup({
    date: new Date("2021-08-09T00:00:00"),
    boss: Bosses.Rimestar,
    weather: EXALTED_WEATHER.Fire,
  }),
  new AbyssLineup({
    date: new Date("2021-08-12T00:00:00"),
    event: "Patch 5.0 (predicted)",
  }),
  new AbyssLineup({
    date: new Date("2021-08-12T00:00:01"),
    boss: Bosses.Heimdall,
    weather: EXALTED_WEATHER.Fire,
  }),
  new AbyssLineup({
    date: new Date("2021-08-16T00:00:00"),
    boss: Bosses.Kasumi,
    weather: EXALTED_WEATHER.TypeCounter,
  }),
  new AbyssLineup({
    date: new Date("2021-08-19T00:00:00"),
    boss: Bosses.Hellmaru,
    weather: EXALTED_WEATHER.Ice,
  }),
  new AbyssLineup({
    date: new Date("2021-08-23T00:00:00"),
    boss: Bosses.MHT3B,
    weather: EXALTED_WEATHER.Fire,
  }),
  new AbyssLineup({
    date: new Date("2021-08-26T00:00:00"),
    boss: Bosses.Jizo,
    weather: EXALTED_WEATHER.Physical,
  }),
  new AbyssLineup({
    date: new Date("2021-08-30T00:00:00"),
    boss: Bosses.Rimestar,
    weather: EXALTED_WEATHER.Fire,
  }),
  new AbyssLineup({
    date: new Date("2021-09-02T00:00:00"),
    boss: Bosses.Couatl,
    weather: EXALTED_WEATHER.Quantum,
  }),
  new AbyssLineup({
    date: new Date("2021-09-06T00:00:00"),
    boss: Bosses.Nihilus,
    weather: EXALTED_WEATHER.Lightning,
  }),
  new AbyssLineup({
    date: new Date("2021-09-09T00:00:00"),
    boss: Bosses.HOMU,
    weather: EXALTED_WEATHER.Bloodlust,
  }),
  new AbyssLineup({
    date: new Date("2021-09-13T00:00:00"),
    boss: Bosses.HoS,
    weather: EXALTED_WEATHER.TypeCounter,
  }),
  new AbyssLineup({
    date: new Date("2021-09-15T00:00:00"),
    event: "Patch 5.1",
  }),
  new AbyssLineup({
    date: new Date("2021-09-16T00:00:00"),
    boss: Bosses.SK,
    weather: EXALTED_WEATHER.TypeCounter,
  }),
  new AbyssLineup({
    date: new Date("2021-09-20T00:00:00"),
    boss: Bosses.Heimdall,
    weather: EXALTED_WEATHER.Fire,
  }),
  new AbyssLineup({
    date: new Date("2021-09-23T00:00:00"),
    boss: Bosses.MHT3B,
    weather: EXALTED_WEATHER.Ignite,
  }),
  new AbyssLineup({
    date: new Date("2021-09-27T00:00:00"),
    boss: Bosses.HoS,
    weather: EXALTED_WEATHER.TypeCounter,
  }),
  new AbyssLineup({
    date: new Date("2021-09-30T00:00:00"),
    boss: Bosses.Hellmaru,
    weather: EXALTED_WEATHER.Ice,
  }),
  new AbyssLineup({
    date: new Date("2021-10-04T00:00:00"),
    boss: Bosses.Huodou,
    weather: EXALTED_WEATHER.TypeCounter,
  }),
  new AbyssLineup({
    date: new Date("2021-10-07T00:00:00"),
    boss: Bosses.Jizo,
    weather: EXALTED_WEATHER.Physical,
  }),
  new AbyssLineup({
    date: new Date("2021-10-11T00:00:00"),
    boss: Bosses.SK,
    weather: EXALTED_WEATHER.TypeCounter,
  }),
  new AbyssLineup({
    date: new Date("2021-10-14T00:00:00"),
    boss: Bosses.AKA,
    weather: EXALTED_WEATHER.Ignite,
  }),
  new AbyssLineup({
    date: new Date("2021-10-18T00:00:00"),
    boss: Bosses.SahaAssaka,
    weather: EXALTED_WEATHER.Ranged,
  }),
  new AbyssLineup({
    date: new Date("2021-10-20T00:00:00"),
    event: "Patch 5.2",
  }),
  new AbyssLineup({
    date: new Date("2021-10-21T00:00:00"),
    boss: Bosses.Andrius,
    weather: EXALTED_WEATHER.TypeCounter,
  }),
  new AbyssLineup({
    date: new Date("2021-10-25T00:00:00"),
    boss: Bosses.AKA,
    weather: EXALTED_WEATHER.Ignite,
  }),
  new AbyssLineup({
    date: new Date("2021-10-28T00:00:00"),
    boss: Bosses.BioMechMobs,
    weather: EXALTED_WEATHER.Bloodlust,
  }),
  new AbyssLineup({
    date: new Date("2021-11-01T00:00:00"),
    boss: Bosses.Jizo,
    weather: EXALTED_WEATHER.Physical,
  }),
  new AbyssLineup({
    date: new Date("2021-11-04T00:00:00"),
    boss: Bosses.Andrius,
    weather: EXALTED_WEATHER.Lightning,
  }),
  new AbyssLineup({
    date: new Date("2021-11-08T00:00:00"),
    boss: Bosses.HoD,
    weather: EXALTED_WEATHER.Imaginary,
  }),
  new AbyssLineup({
    date: new Date("2021-11-11T00:00:00"),
    boss: Bosses.HOMU,
    weather: EXALTED_WEATHER.Bloodlust,
  }),
  new AbyssLineup({
    date: new Date("2021-11-15T00:00:00"),
    boss: Bosses.BKE,
    weather: EXALTED_WEATHER.Lightning,
  }),
  new AbyssLineup({
    date: new Date("2021-11-18T00:00:00"),
    boss: Bosses.SahaAssaka,
    weather: EXALTED_WEATHER.Ranged,
  }),
  new AbyssLineup({
    date: new Date("2021-11-22T00:00:00"),
    boss: Bosses.Huodou,
    weather: EXALTED_WEATHER.TypeCounter,
  }),
  new AbyssLineup({
    date: new Date("2021-11-25T00:00:00"),
    boss: Bosses.Parvati,
    weather: EXALTED_WEATHER.Ignite,
  }),
  new AbyssLineup({
    date: new Date("2021-11-29T00:00:00"),
    boss: Bosses.Tonatiuh,
    weather: EXALTED_WEATHER.Lightning,
  }),
  new AbyssLineup({
    date: new Date("2021-12-02T00:00:00"),
    boss: Bosses.SahaAssaka,
    weather: EXALTED_WEATHER.Physical,
  }),
  new AbyssLineup({
    date: new Date("2021-12-06T00:00:00"),
    boss: Bosses.Rimestar,
    weather: EXALTED_WEATHER.Fire,
  }),
  new AbyssLineup({
    date: new Date("2021-12-09T00:00:00"),
    boss: Bosses.NewBS,
    weather: EXALTED_WEATHER.ShieldBreak,
  }),
  new AbyssLineup({
    date: new Date("2021-12-13T00:00:00"),
    boss: Bosses.MHT3B,
    weather: EXALTED_WEATHER.Ranged,
  }),
  new AbyssLineup({
    date: new Date("2021-12-16T00:00:00"),
    boss: Bosses.Andrius,
    weather: EXALTED_WEATHER.Lightning,
  }),
  new AbyssLineup({
    date: new Date("2021-12-20T00:00:00"),
    boss: Bosses.Hellmaru,
    weather: EXALTED_WEATHER.Ice,
  }),
  new AbyssLineup({
    date: new Date("2021-12-23T00:00:00"),
    boss: Bosses.Parvati,
    weather: EXALTED_WEATHER.Ignite,
  }),
  new AbyssLineup({
    date: new Date("2021-12-27T00:00:00"),
    boss: Bosses.DXY,
    weather: EXALTED_WEATHER.TypeCounter,
  }),
  new AbyssLineup({
    date: new Date("2021-12-30T00:00:00"),
    boss: Bosses.Elysia,
    weather: EXALTED_WEATHER.Ice,
  }),
  new AbyssLineup({
    date: new Date("2022-01-03T00:00:00"),
    boss: Bosses.SK,
    weather: EXALTED_WEATHER.TypeCounter,
  }),
]);
// Lineup sources with weathers in video:
// https://space.bilibili.com/25289147/video (3rdguide channel)
// https://space.bilibili.com/60622135/video
// https://space.bilibili.com/24486730/video
// https://space.bilibili.com/345878430/video
// https://space.bilibili.com/189912239/video
// https://space.bilibili.com/238272931/video
// https://space.bilibili.com/64267902/video
// https://space.bilibili.com/298574258 (stopped posting 2021-10-12)
// https://space.bilibili.com/70973141 (stopped posting 2021-09-05)
// https://space.bilibili.com/23175073/video (stopped posting 2021-08-19)
//
// Search for all ex abyss vids, sorted by recency:
// https://search.bilibili.com/all?keyword=%E8%B6%85%E5%BC%A6%E7%A9%BA%E9%97%B4&order=pubdate&duration=0&tids_1=0

const today = new Date();

const RECENT_LINEUPS = Object.freeze(
  ABYSS_LINEUPS.filter((lineup) => daysDifference(today, lineup.date) >= -6)
);

export { RECENT_LINEUPS };
