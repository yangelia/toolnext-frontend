"use client";

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import FeedbackCard from './FeedbackCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './FeedbackSection.module.css';

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
          nextEl: `.${styles.nextBtn}`,
          prevEl: `.${styles.prevBtn}`,
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
    <section className={styles.sectionFeedback}>
      <div className={styles.container}>
        <h2 className={styles.feedbackName}>Останні відгуки</h2>
        
        <div className={`swiper ${styles.feedbackSwiper}`} ref={swiperContainerRef}>
          <div className="swiper-wrapper">
            {Array.isArray(feedbacks) && feedbacks.map((item) => (
              <div className="swiper-slide" key={item._id}>
                <FeedbackCard name={item.name} description={item.description} rate={item.rate}/>
              </div>
            ))}
          </div>
          
          <div className={styles.feedbackControls}>
            <div className="swiper-pagination feedback-pagination"></div>
            <div className={styles.feedbackNavButtons}>
              <button className={`${styles.navBtn} ${styles.prevBtn}`} aria-label="Previous">←</button>
              <button className={`${styles.navBtn} ${styles.nextBtn}`} aria-label="Next">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;