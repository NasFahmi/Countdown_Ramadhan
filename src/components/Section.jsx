import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Section() {
  const [Time, setTime] = useState(new Date());
  const [Data, setData] = useState({})
  const [Location, setLocation] = useState({
    City:'Banyuwangi',
    Country:'Indonesia'
  })

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });
  let day = days[Time.getDay()];
  let month = monthNames[Time.getMonth()];
  let year = Time.getFullYear();
  let hours = Time.getHours();
  let minutes = Time.getMinutes();
  let seconds = Time.getSeconds();


  useEffect(() => {
    async function fetchData() {
      try {
        const respon = await axios.get(`http://api.aladhan.com/v1/calendarByCity/2023/3?city=${Location.City}&country=${Location.Country}&method=2`)
        let daysnow = Time.getDate() - 1;
        setData(respon.data.data[daysnow].timings)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    return () => {

    }
  }, [])
  return (
    <div>
      <div className="background bg-Sand w-full h-full">
        <div className="bg-darkBlue w-full h-full z-10 rounded-t-[45px] py-8 flex justify-center items-center flex-col">
          <div className="container py-8 flex justify-center items-center flex-col">
            <div className="container px-8 ">
              <form action="" method="get">
                <div className="flex justify-between items-center bg-whiteCostume px-4 py-2  mx-auto rounded-lg max-w-[316px] md:max-w-sm lg:max-w-md">
                  <div className="logoSearch flex justify-center items-center gap-2 ">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <div>
                      <input
                        type="text"
                        placeholder="Search Location"
                        className="text-sm w-full px-4 py-2 bg-transparent focus:outline-none md:w-[140%] lg:w-[170%]"
                      />
                    </div>
                  </div>
                  <input
                    type="button"
                    value="Search"
                    className="bg-darkBlue p-2 text-white rounded-lg"
                  />
                </div>
              </form>
              <h1 className="text-center text-lg text-white font-semibold mt-8 mb-4 md:text-2xl">
                Current Location is {Location.City}
              </h1>
              <div className="bg-whiteCostume rounded-2xl  mx-auto h-fit px-8 py-5 max-w-[316px]  lg:max-w-sm">
                <h1 className="text-center">Current Time</h1>
                <h1 className="font-semibold text-2xl mt-1 text-center">
                  {day} {month} {year}
                </h1>
                <div className="flex justify-center items-center mt-2 gap-5 md:gap-3">
                  <div className="clock flex justify-center items-center flex-col w-12">
                    <h1 className="font-medium  text-4xl">{hours}</h1>
                  </div>
                  <h1 className="font-medium  text-2xl">:</h1>
                  <div className="clock flex justify-center items-center flex-col w-12">
                    <h1 className="font-medium  text-4xl">{minutes}</h1>
                  </div>
                  <h1 className="font-medium  text-2xl">:</h1>
                  <div className="clock flex justify-center items-center flex-col w-12">
                    <h1 className="font-medium  text-4xl">{seconds}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 justify-center items-center px-8 gap-4 mt-8 md:grid-cols-4 md:grid-flow-row lg:grid-cols-6">
              <div className="bg-whiteCostume rounded-2xl w-fit px-10 py-5">
                <h1 className="text-center font-medium">Imsak</h1>
                <h1 className="text-center">{Data.Imsak}</h1>
              </div>
              <div className="bg-whiteCostume rounded-2xl w-fit px-10 py-5">
                <h1 className="text-center font-medium">Shubuh</h1>
                <h1 className="text-center">{Data.Fajr}</h1>
              </div>
              <div className="bg-whiteCostume rounded-2xl w-fit px-10 py-5">
                <h1 className="text-center font-medium">Dhuhur</h1>
                <h1 className="text-center">{Data.Dhuhr}</h1>
              </div>
              <div className="bg-whiteCostume rounded-2xl w-fit px-10 py-5">
                <h1 className="text-center font-medium">Ashar</h1>
                <h1 className="text-center">{Data.Asr}</h1>
              </div>
              <div className="bg-whiteCostume rounded-2xl w-fit px-10 py-5 md:row-start-2 md:col-start-2 lg:row-start-auto lg:col-start-auto">
                <h1 className="text-center font-medium">Magrib</h1>
                <h1 className="text-center">{Data.Maghrib}</h1>
              </div>
              <div className="bg-whiteCostume rounded-2xl w-fit px-10 py-5 md:row-start-2 md:col-start-3 lg:row-start-auto lg:col-start-auto">
                <h1 className="text-center font-medium">Isya</h1>
                <h1 className="text-center">{Data.Isha}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
