"use client";

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import FeedbackCard from './FeedbackCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from "./FeedbackSection.module.css";

interface Feedback {
  _id: string;
  name: string;
  description: string;
  rate: number;
}

const FeedbackSection: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const swiperContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios.get('http://localhost:3000/feedbacks')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.feedbacks;
        if (Array.isArray(data)) {
          setFeedbacks(data);
        } else {
          console.error("Отримані дані не є масивом:", res.data);
        }
      })
      .catch(err => console.error("Помилка запиту:", err));
  }, []);

  useEffect(() => {
    if (feedbacks.length > 0 && swiperContainerRef.current) {
      const swiper = new Swiper(swiperContainerRef.current, {
        modules: [Navigation, Pagination],
        pagination: {
          el: '.feedback-pagination',
          dynamicMainBullets: 3,
          dynamicBullets: true,
          clickable: true,
        },
        navigation: {
          nextEl: '.next-btn-js',
          prevEl: '.prev-btn-js',
        },
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
          768: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }
      });
      return () => swiper.destroy();
    }
  }, [feedbacks]);

  return (
    <section className="section-feedback">
      <div className="container">
        <h2 className="feedback-name">Відгуки клієнтів</h2>
        
        <div className="swiper feedback-swiper" ref={swiperContainerRef}>
          <div className="swiper-wrapper">
            {Array.isArray(feedbacks) && feedbacks.map((item) => (
              <div className="swiper-slide" key={item._id}>
                <FeedbackCard name={item.name} description={item.description} rate={item.rate}/>
              </div>
            ))}
          </div>
          
          <div className="feedback-controls">
            <div className="swiper-pagination feedback-pagination"></div>
            <div className="feedback-nav-buttons">
              <button className="nav-btn prev-btn-js" aria-label="Previous">←</button>
              <button className="nav-btn next-btn-js" aria-label="Next">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;