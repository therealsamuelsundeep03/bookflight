import React from 'react';
import Lottie from "react-lottie";


const Animation = ({anime}) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: anime,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      }
    return (
        <Lottie 
        options={defaultOptions}
        />
    )
}

export default Animation;