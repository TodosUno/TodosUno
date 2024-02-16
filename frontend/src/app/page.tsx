import React from 'react'
import QuienesSomos from "../components/quienesSomos/quienesSomos"
import Banner from '../components/banner/banner'
import "./home.css"
import Footer from "../components/footer/footer"

const Home = () => {
  return (
    <div className='home'>
    <Banner/>
    <QuienesSomos/>
    <Footer/>
    </div>
  )
}

export default Home;

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       console.log("1");
  //       const res = await fetch("http://localhost:4000/user/data", {
  //         headers: {
  //           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM5Yzg3MDc1YjhlMmRmM2Q1Zjc0M2IiLCJlbWFpbCI6Im1hcmlhbm8uZDExQGhvdG1haWwiLCJpYXQiOjE2OTEyNjY5MjcsImV4cCI6MTY5MTI3MjkyN30.D_rRbt2glAZHBYgrw3szZIsefnC5lBvA9L2cLmAss2U`,
  //         },
  //       });
  //       console.log(res);
  //       const json = await res.json();
  //       setDataUser(json);
  //     } catch (error) {
  //       console.error("Error fetching private data:", error);
  //     }
  //   };

  //   getData();
  // }, []);

