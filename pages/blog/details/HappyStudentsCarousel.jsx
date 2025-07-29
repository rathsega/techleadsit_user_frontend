"use client";
import React, { useState, useEffect } from "react";
import httpService from "../../../services/httpService";
import Image from "next/image";

const HappyStudentsCarousel = () => {

  const [happyStudents, setHappyStudents] = useState([]);

  useEffect(() => {

    const fetchHappyStudents = async () => {
      try {
        const response = await httpService.get(`happy-students`);
        if (response?.data) {
          setHappyStudents(response?.data);
        }
      } catch (error) {
        console.error("Error fetching happy students:", error);
      }
    }

    fetchHappyStudents();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
        import("bootstrap/dist/js/bootstrap.bundle.min.js").then((bootstrap) => {
            const carouselElement = document.querySelector("#customCarousel");
            if (carouselElement) {
                new bootstrap.Carousel(carouselElement, { interval: 3000 }); // Auto-slide every 3s
            }
        }).catch((error) => console.error("Bootstrap JS load error:", error));
    }
}, []);


  return (
      <div className="align-me-5">
        <h2 className="happy-students-h">Our Happy Students</h2>
        <div className="carousel-container">
          <div id="customCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {happyStudents.map((hs, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                  <Image src={process.env.NEXT_PUBLIC_FILES_URL + hs?.cardImage?.path} style={{"maxWidth":"100%","width":"auto","height":"auto","borderRadius":"26px"}} alt={`Slide ${index + 1}`} className="d-block w-100"  width="345" height="496" />
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="carousel-indicators">
              {happyStudents.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#customCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>

            {/* Carousel Controls */}
            <button className="carousel-control-prev" type="button" data-bs-target="#customCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#customCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </div>
  );
};

export default HappyStudentsCarousel;
