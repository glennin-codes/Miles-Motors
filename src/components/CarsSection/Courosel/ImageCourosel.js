import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Modal, Box } from "@mui/material";
import { getCarById } from "../../../api/cars";
import "./Image.css";

function SamplePrevArrow({ onClick }) {
  return (
    <button
      type="button"
      className="carousel-arrow carousel-arrow--prev"
      onClick={onClick}
      aria-label="Previous image"
    >
      <ChevronLeftIcon />
    </button>
  );
}

function SampleNextArrow({ onClick }) {
  return (
    <button
      type="button"
      className="carousel-arrow carousel-arrow--next"
      onClick={onClick}
      aria-label="Next image"
    >
      <ChevronRightIcon />
    </button>
  );
}

export default function ImageCarousel() {
  const { carID } = useParams();
  const [carImages, setCarImages] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    let cancelled = false;
    getCarById(carID)
      .then((data) => { if (!cancelled) setCarImages(data); })
      .catch(() => { if (!cancelled) setCarImages({}); });
    return () => { cancelled = true; };
  }, [carID]);

  const {
    carImg,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
  } = carImages || {};

  const images = [
    { id: 1, src: carImg },
    { id: 2, src: image2 },
    { id: 3, src: image3 },
    { id: 4, src: image4 },
    { id: 5, src: image5 },
    { id: 6, src: image6 },
    { id: 7, src: image7 },
    { id: 8, src: image8 },
    { id: 9, src: image9 },
    { id: 10, src: image10 },
  ];
  const validImages = images.filter((img) => img.src);
  const currentImage = validImages[currentSlideIndex]?.src;

  const openLightbox = (e) => {
    if (e) e.stopPropagation();
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  const goLightboxPrev = () => {
    setCurrentSlideIndex((i) => (i <= 0 ? validImages.length - 1 : i - 1));
  };
  const goLightboxNext = () => {
    setCurrentSlideIndex((i) => (i >= validImages.length - 1 ? 0 : i + 1));
  };

  const hasMultiple = validImages.length > 1;
  const settings = {
    infinite: hasMultiple,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: hasMultiple,
    dots: true,
    autoplay: hasMultiple,
    autoplaySpeed: 4000,
    cssEase: "ease",
    lazyLoad: true,
    afterChange: (index) => setCurrentSlideIndex(index),
    prevArrow: hasMultiple ? <SamplePrevArrow /> : null,
    nextArrow: hasMultiple ? <SampleNextArrow /> : null,
    customPaging(i) {
      return (
        <button type="button" className="carousel-thumb" aria-label={`View image ${i + 1}`}>
          <img src={validImages[i]?.src} alt="" />
        </button>
      );
    },
    appendDots: (dots) => (
      <div className="carousel-thumbnails">
        <div className="carousel-thumbnails__label">
          {validImages.length} photo{validImages.length !== 1 ? "s" : ""}
        </div>
        <ul className="carousel-thumbnails__list">{dots}</ul>
      </div>
    ),
  };

  return (
    <div className="carousel-wrap">
      <Slider ref={carousel} {...settings} className="slyder">
        {validImages.length
          ? validImages.map((item) => (
              <div key={item.id} className="photo--container">
                <div
                  className="photo--container__inner"
                  onClick={openLightbox}
                  onKeyDown={(e) => e.key === "Enter" && openLightbox()}
                  role="button"
                  tabIndex={0}
                  aria-label="View full size"
                >
                  <img src={item.src} alt="" className="car--photo" />
                  <IconButton
                    className="carousel-expand-btn"
                    onClick={openLightbox}
                    aria-label="View full size"
                    size="small"
                  >
                    <OpenInFullIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
            ))
          : (
              <div className="photo--container">
                <div
                  className="photo--container__inner"
                  onClick={openLightbox}
                  role="button"
                  tabIndex={0}
                  aria-label="View full size"
                >
                  <img src={carImg || ""} alt="" className="car--photo" />
                  <IconButton
                    className="carousel-expand-btn"
                    onClick={openLightbox}
                    aria-label="View full size"
                    size="small"
                  >
                    <OpenInFullIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
            )}
      </Slider>

      <Modal
        open={lightboxOpen}
        onClose={closeLightbox}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(8px)",
          "& .MuiBackdrop-root": {
            bgcolor: "rgba(40, 44, 52, 0.85)",
          },
        }}
      >
        <Box
          sx={{
            outline: "none",
            position: "relative",
            maxWidth: "95vw",
            maxHeight: "95vh",
            bgcolor: "rgba(45, 48, 55, 0.97)",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 24px 48px rgba(0,0,0,0.3)",
          }}
          onClick={closeLightbox}
        >
          <IconButton
            onClick={closeLightbox}
            aria-label="Close"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 2,
              color: "rgba(255,255,255,0.9)",
              bgcolor: "rgba(255,255,255,0.12)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            sx={{
              px: 6,
              py: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 300,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {currentImage && (
              <img
                src={currentImage}
                alt=""
                style={{
                  maxWidth: "85vw",
                  maxHeight: "85vh",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            )}
          </Box>
          {hasMultiple && (
            <>
              <IconButton
                onClick={(e) => { e.stopPropagation(); goLightboxPrev(); }}
                aria-label="Previous"
                sx={{
                  position: "absolute",
                  left: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 2,
                  color: "rgba(255,255,255,0.9)",
                  bgcolor: "rgba(255,255,255,0.12)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                onClick={(e) => { e.stopPropagation(); goLightboxNext(); }}
                aria-label="Next"
                sx={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 2,
                  color: "rgba(255,255,255,0.9)",
                  bgcolor: "rgba(255,255,255,0.12)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                }}
              >
                <ChevronRightIcon />
              </IconButton>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "0.875rem",
                }}
              >
                {currentSlideIndex + 1} / {validImages.length}
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
