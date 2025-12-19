import "../../../css/admin/adminhome.css";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FaClipboardList, FaCarAlt, FaTools } from "react-icons/fa";
import { IoCarSportSharp } from "react-icons/io5";
import { useEffect, useState } from "react";


const AdminHome = () => {

  const [stats, setStats] = useState({
    totalCars: 0,
    totalBookings: 0,
    availableCars: 0,
    maintenanceCars: 0
  });

  useEffect(() => {
    const dashboard = async () => {
      try {
        const res = await fetch(
          "https://rentgo-backend.onrender.com/admin/dashboard",
          { credentials: "include" }
        );

        const data = await res.json();
        console.log(data);

        if (data.success) {
          setStats({
            totalCars: data.totalCars,
            totalBookings: data.totalBookings,
            availableCars: data.availableCars,
            maintenanceCars: data.maintenanceCars
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    dashboard();
  }, []);

  
  return (
    <div className="container-fluid p-4 dashboard-bg">

      <div className="row g-4 mb-5">

     

        <div className="col-md-3">
          <StatCard
            title="Total Orders"
            value={stats.totalBookings}
            cardClass="card-green"
            icon={<FaClipboardList size={45} />}
          />
        </div>

        <div className="col-md-3">
          <StatCard
            title="Total Cars"
            value={stats.totalCars}
            cardClass="card-yellow"
            icon={<FaCarAlt size={45} />}
          />
        </div>

        <div className="col-md-3">
          <StatCard
            title="Available Cars"
            value={stats.availableCars}
            cardClass="card-blue"
            icon={<IoCarSportSharp size={45} />}
          />
        </div>

        <div className="col-md-3">
          <StatCard
            title="In Maintenance"
            value={stats.maintenanceCars}
            cardClass="card-red"
            icon={<FaTools size={45} />}
          />
        </div>

      </div>

      {/* <div className="row g-4">

        
        <div className="col-md-6">
          <div className="chart-box">
            <div className="d-flex justify-content-between mb-3">
              <h5 className="chart-title">Total Revenue</h5>
              <button className="btn btn-outline-secondary btn-sm">
                Weekly
              </button>
            </div>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="day" />
                <Tooltip />
                <Bar dataKey="rent" fill="#E74C3C" />
                <Bar dataKey="revenue" fill="#F1C40F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

    
        <div className="col-md-6">
          <div className="chart-box">
            <h5 className="chart-title mb-4">Pie Chart</h5>

            <div className="row text-center">
              {pieData.map((item, index) => (
                <div
                  key={index}
                  className="col-4 d-flex flex-column align-items-center"
                >
                  <PieChart width={120} height={120}>
                    <Pie
                      data={[item]}
                      cx={60}
                      cy={60}
                      startAngle={90}
                      endAngle={-270}
                      innerRadius={30}
                      outerRadius={50}
                      dataKey="value"
                    >
                      <Cell fill={item.color} />
                    </Pie>
                  </PieChart>

                  <p className="pie-text-value mt-2">{item.value}%</p>
                  <p className="pie-text-label">{item.name}</p>
                </div>
              ))}
            </div>

          </div>
        </div> */}

      {/* </div> */}
    </div>
  );
};


const StatCard = ({ title, value, cardClass, icon }) => {
  return (
    <div className={`stat-card ${cardClass}`}>
      <div>
        <h6 className="stat-card-title">{title}</h6>
        <p className="stat-card-value">{value}</p>
      </div>

      <div className="stat-card-icon">{icon}</div>
    </div>
  );
};

export default AdminHome;
