import React from "react";
import {SoundtracksStoreServiceConsumer} from "../soundtracks-service-context";

const WithSountracksService = () => (Wrapped) => {
    return (props) => {
        return (
            <SoundtracksStoreServiceConsumer>
                {
                    (WithSoundtracksService) =>{
                        return  <Wrapped {...props} SoundtracksService={WithSoundtracksService}/>
                    }
                }
            </SoundtracksStoreServiceConsumer>
        );
    }
};

export default WithSountracksService;
