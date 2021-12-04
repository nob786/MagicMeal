import React from "react";

/*=========================Importing CSS File=========================*/
import "../MainPage/MainPage.css";
import NewsLetter from "../SpecialComp/NewsLetter/NewsLetter";

/**=============================Importing Components====================== */
import PartenerImage from "../SpecialComp/PartenerImage/PartenerImage.jsx";

const MainPage = () => {
  return (
    <div className="MainPage">
      <div className="main-page-location"></div>

      <div class="bd-example">
        <div
          id="carouselExampleCaptions"
          class="carousel slide"
          data-ride="carousel"
        >
          <ol class="carousel-indicators">
            <li
              data-target="#carouselExampleCaptions"
              data-slide-to="0"
              class="active"
            ></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active p1">
              {/*<img
                src="./Pictures/main2.jpg"
                class="d-block w-100"
                alt="Pehli Slide"
              />*/}
              <div class="carousel-caption d-md-block">
                <h5>First slide label</h5>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </div>
            </div>
            <div class="carousel-item p2">
              {/*<img
                src="./Pictures/Gr2.jpg"
                class="d-block w-100"
                alt="ssissisi"
              />*/}
              <div class="carousel-caption d-md-block">
                <h5>Second slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div class="carousel-item p3">
              {/*<img
                src="./Pictures/Gr1.jpg"
                class="d-block w-100"
                alt="ssjisjks"
              />*/}
              <div class="carousel-caption d-md-block">
                <h5>Third slide label</h5>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </div>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleCaptions"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
      <PartenerImage />

      <div className="clients">
        <div className="client-container">
          <div className="client-row">
            <div className="client-col-3">
              <div className="client">
                <h1>120</h1>
                <p>Restaurants</p>
              </div>
            </div>
            <div className="client-col-3">
              <div className="client">
                <h1>58</h1>
                <p>Menus</p>
              </div>
            </div>
            <div className="client-col-3">
              <div className="client">
                <h1>14868</h1>
                <p>Satisfied Clients</p>
              </div>
            </div>
            <div className="client-col-3">
              <div className="client">
                <h1>2031</h1>
                <p>orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewsLetter />
    </div>
  );
};

export default MainPage;
