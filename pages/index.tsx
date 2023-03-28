import config from "@config/config.json";
import theme from "@config/theme.json";
import Base from "@layouts/Baseof";
import "swiper/swiper.min.css";
import { getListPage } from "../lib/contentParser";
import { useEffect, useState } from "react";
import Banner from "@layouts/components/Banner";
import SalahList from "@layouts/components/SalahList";
import ContactUs from "@layouts/components/ContactUs";
import FeatureCard from "@layouts/components/FeatureCard";
import OverviewCard from "@layouts/components/OverviewCard";
import SalahCard from "@layouts/components/SalahCard";
import SalahTable from "@layouts/components/SalahTable";

async function getSalah() {
  const res = await fetch("/api/salah?type=month");
  return res.json();
}

const Home = ({ frontmatter }: any) => {
  const { banner, feature, services, salat, contact_us } = frontmatter;
  const { title, salah_type } = config.site;
  const { colors } = theme;
  const [salah, setSalah] = useState<any>();

  useEffect(() => {
    async function _getSalah() {
      const data = await getSalah();
      setSalah(data);
    }
    _getSalah();
  }, []);

  return (
    <Base title={title}>

      {/* salah times 2 */}
      {salah_type === 2 && (
        <section className="section">
          <SalahCard salah={salah} colors={colors} />
        </section>
      )}

      {/* Banner */}
      <section className="section bg-theme-light pb-[50px]">
        <Banner banner={banner} />
      </section>

      {/* Features */}
      <section className="section">
        <FeatureCard feature={feature} theme={theme} />
      </section>

      {/* salah times 1 */}
      {salah_type === 1 && (
        <section key={`salah-${1}`} className={`section bg-theme-light`}>
          <SalahList salat={salat} />
        </section>
      )}

      {/* salah table */}
      <section className="section bg-theme-light" id="prayers">
        <SalahTable salah={salah} colors={colors} />
      </section>

      {/* services */}
      {services.map((service: any, index: any) => {
        const isOdd = index % 2 > 0;
        return (
          <section
            key={`service-${index}`}
            className={`section ${isOdd && "bg-theme-light"}`}
            id={service.id}
          >
            <OverviewCard service={service} isOdd={isOdd} />
          </section>
        );
      })}

      {/* Contact Us */}
      <section className="section" id="contactUs">
        <ContactUs contact_us={contact_us} theme={theme} />
      </section>
    </Base>
  );
};


export const getStaticProps = async () => {
  const homePage = await getListPage("content/_index.md");
  const { frontmatter } = homePage;
  return {
    props: {
      frontmatter,
    },
  };
};

export default Home;
