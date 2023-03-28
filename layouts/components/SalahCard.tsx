import { markdownify } from "@lib/utils/textConverter";
import moment from "moment";

const SalahCard = ({ salah, colors }: any) => {
  return (
    <div className="container">
      {/* Card */}
      <div className="text-center">
        <h2>{markdownify("Today's Salat times", "", "")}</h2>
        <h6>{markdownify(moment(salah?.data?.today.date).format("DD MMM YYYY"), "", "")}</h6>
      </div>
      <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-6">
        {/* sunrise */}
        <div
          className="feature-card rounded-xl p-5 pb-8 text-center drop-shadow-xl"
          style={{
            backgroundColor: colors.default.theme_color.theme_light,
          }}
          key={`feature-sunrise`}
        >
          <div className="mt-4 text-black">
            {markdownify("Sunrise", "h3", "h5")}
            <p className="mt-3">{salah?.data?.today.sunrise}</p>
          </div>
        </div>
        {/* fajr */}
        <div
          className="feature-card rounded-xl p-5 pb-8 text-center drop-shadow-xl"
          style={{
            backgroundColor: colors.default.theme_color.theme_light,
          }}
          key={`feature-fajr`}
        >
          <div className="mt-4 text-black">
            {markdownify("Fajr", "h3", "h5")}
            <p className="mt-3">{salah?.data?.today.fajr}</p>
          </div>
        </div>
        {/* dhuhr */}
        <div
          className="feature-card rounded-xl p-5 pb-8 text-center drop-shadow-xl"
          style={{
            backgroundColor: colors.default.theme_color.theme_light,
          }}
          key={`feature-dhuhr`}
        >
          <div className="mt-4 text-black">
            {markdownify("Dhuhr", "h3", "h5")}
            <p className="mt-3">{salah?.data?.today.dhuhr}</p>
          </div>
        </div>
        {/* asr */}
        <div
          className="feature-card rounded-xl p-5 pb-8 text-center drop-shadow-xl"
          style={{
            backgroundColor: colors.default.theme_color.theme_light,
          }}
          key={`feature-asr`}
        >
          <div className="mt-4 text-black">
            {markdownify("Asr", "h3", "h5")}
            <p className="mt-3">{salah?.data?.today.asr}</p>
          </div>
        </div>
        {/* magrib */}
        <div
          className="feature-card rounded-xl p-5 pb-8 text-center drop-shadow-xl"
          style={{
            backgroundColor: colors.default.theme_color.theme_light,
          }}
          key={`feature-magrib`}
        >
          <div className="mt-4 text-black">
            {markdownify("Magrib", "h3", "h5")}
            <p className="mt-3">{salah?.data?.today.magrib}</p>
          </div>
        </div>
        {/* isha */}
        <div
          className="feature-card rounded-xl p-5 pb-8 text-center drop-shadow-xl"
          style={{
            backgroundColor: colors.default.theme_color.theme_light,
          }}
          key={`feature-isha`}
        >
          <div className="mt-4 text-black">
            {markdownify("Isha", "h3", "h5")}
            <p className="mt-3">{salah?.data?.today.isha}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalahCard;
