import { useEffect } from "react";
import $ from "jquery";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel";
import { WOW } from "wowjs";

const MainEffects = () => {
  useEffect(() => {
    // WOW.js
    new WOW().init();

    // Sticky Navbar
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 40) {
        $(".navbar").addClass("sticky-top");
      } else {
        $(".navbar").removeClass("sticky-top");
      }
    });

    // Back to Top
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 100) {
        $(".back-to-top").fadeIn("slow");
      } else {
        $(".back-to-top").fadeOut("slow");
      }
    });

    $(".back-to-top").on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
      return false;
    });

    // Price Carousel
    $(".price-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1500,
      margin: 45,
      dots: false,
      loop: true,
      nav: true,
      navText: [
        '<i class="bi bi-arrow-left"></i>',
        '<i class="bi bi-arrow-right"></i>',
      ],
      responsive: { 0: { items: 1 }, 768: { items: 2 } },
    });

    // Testimonials Carousel
    $(".testimonial-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      items: 1,
      dots: false,
      loop: true,
      nav: true,
      navText: [
        '<i class="bi bi-arrow-left"></i>',
        '<i class="bi bi-arrow-right"></i>',
      ],
    });

    return () => {
      $(window).off("scroll");
      $(".back-to-top").off("click");
    };
  }, []);

  return null; // No UI, just effects
};

export default MainEffects;
