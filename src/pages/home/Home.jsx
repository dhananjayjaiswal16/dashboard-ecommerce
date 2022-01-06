import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethod";

export default function Home() {
  const [userStats, setUserStats] = useState([]);
  const MONTHS = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get('user/stats');
        res.data.map((value) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[value._id - 1], "Active User": value.total }
          ])
        )
      } catch (error) {
        console.log("ERROR while fetching user stats with err msg", err.msg);
      }
    }
    getStats();
  }, []);

  console.log("userStats", userStats);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
