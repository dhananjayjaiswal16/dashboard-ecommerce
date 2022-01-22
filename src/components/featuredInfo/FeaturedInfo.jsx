import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from '../../requestMethod';
export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [revPerc, setRevPerc] = useState();
  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("order/income");
        // console.log("res.data in income", res.data);
        setIncome(res.data);
      } catch (err) {

      }
    }
    getIncome();
  }, [])
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">₹ {income.length > 0 ? income[1]?.total : 0}</span>
          <span className="featuredMoneyRate">
            11.4 <ArrowUpward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
