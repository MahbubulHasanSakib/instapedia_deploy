import React from 'react'
import Story from './Story'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Stories = ({ stories }) => {
  return (
    <div className='stories' style={{ width: '50%', margin: '15px auto 10px' }}>
      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={stories.length > 5 ? 5 : stories.length}
        navigation
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {
          stories.map(s => <SwiperSlide><Story sty={s} /></SwiperSlide>)
        }

      </Swiper>
    </div>
  )
}

export default Stories