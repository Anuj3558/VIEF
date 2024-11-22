import VideoThumbnail from "./video-thumbnail.jsx";
import { Rectangle23 } from "../../Assets/images/index.js";
import { Rectangle24 } from "../../Assets/images/index.js";
import { Rectangle25 } from "../../Assets/images/index.js";
import { Rectangle26 } from "../../Assets/images/index.js";
export default function WorkGlimpse() {
  return (
    <div className="mx-auto max-w-[1515px] px-4 h-[75vh] flex flex-col justify-center">
      <h2 className="mb-4 text-center text-2xl font-bold tracking-tighter md:text-4xl">
        Glimpse of our work
      </h2>
      <div className="flex flex-col gap-10 md:flex-row h-[calc(70vh-4rem)]">
        <div className="md:w-[85%]">
          <VideoThumbnail
            src={Rectangle23}
            alt="Office workspace with computers and hanging lights"
            className="h-full w-full rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-10 md:w-[35%]">
          <VideoThumbnail
            src={Rectangle24}
            alt="Notebook with dark background"
            className="aspect-[16/9] rounded-xl"
          />
          <VideoThumbnail
            src={Rectangle25}
            alt="Whiteboard with business notes"
            className="aspect-[16/9] rounded-xl"
          />
          <VideoThumbnail
            src={Rectangle26}
            alt="Team meeting space"
            className="aspect-[16/9] rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
