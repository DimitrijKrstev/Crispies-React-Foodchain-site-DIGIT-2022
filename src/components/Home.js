import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import 'swiper/less/pagination';
import { Link } from "react-router-dom";
import "swiper/swiper-bundle.min.css";

const HomeMenuCard = (props) => {
  return (
    <Link to="/Menu#Combos">
      <div className='flex flex-col border-2 border-offblack m-1 items-stretch max-w-sm bg-beige w-80 mt-4'>
        <img src={props.picture} className='flex border-b-2 border-offblack' alt="item picture"></img>
        <p className='text-center textSignin text-2xl mt-4'>{props.name}</p>
        <p className='text-center textSignin text-1xl mb-4'>Price: {props.price}</p>
        <div className='flex flex-row self-stretch'>
          <p className='border-2 border-black border-b-0 w-full bg-offblack text-beige textSignin text-1xl btnHoverCart text-center'>Check out in Menu</p>
        </div>
      </div>
    </Link>
  )
}

export default function Home() {
  return (
    <>
    <h1 class=" border-b-2 border-offblack text-4xl text-center bg-beige titleLocations py-3">Your Taste buds' second home</h1>
    <div className="flex justify-center">
      <div className="flex flex-col items-center bg-beigeLight border-2 border-black mb-10 mt-8 min-w-[21rem]">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            renderBullet: function () {
              return (
                '<span class="border-2 border-black bg-red-400 min-w-[5px] min-h-[5px] invisible">asd</span>'
              )
            }
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper mt-8 max-w-[68vw] max-h-[58vh] border-2 border-black min-w-[20rem] mx-8"
        >
          <SwiperSlide className="flex justify-center"><img src={"https://media.discordapp.net/attachments/413015034159955973/1052977323621761064/IMG_2153.png"}></img></SwiperSlide>
          <SwiperSlide className="flex justify-center"><img src={"https://media.discordapp.net/attachments/777646602735058975/1052898627909062706/RDT_20221215_114250659565760978107184.jpg"}></img></SwiperSlide>
        </Swiper>
        <h1 className="font-bold mt-2 text-3xl">Specials</h1>
        <div className="flex justify-center mb-5 flex-wrap max-w-[70vw]">
          <HomeMenuCard name="Crispy Chicken Combo" price="360" picture="https://media.discordapp.net/attachments/441534031016755200/1052968276382199891/Combo_Cheeseburger.jpg"></HomeMenuCard>
          <HomeMenuCard name="Crispy Wrap Combo" price="320" picture="https://media.discordapp.net/attachments/441534031016755200/1052968275744653372/Classic_Combo_Wrap.jpg"></HomeMenuCard>
          <HomeMenuCard name="Cheese Chicken Combo" price="380" picture="https://media.discordapp.net/attachments/441534031016755200/1052968276055040010/Combo_Crispy.jpg"></HomeMenuCard>
        </div>
      </div>
    </div>
    </>
  );
}
