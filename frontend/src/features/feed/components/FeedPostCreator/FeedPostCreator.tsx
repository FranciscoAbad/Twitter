import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import "./FeedPostCreator.css";
import { ExpandMore } from "@mui/icons-material";
import GlobeSVG from "../../../../components/SVGs/GlobeSVG";
import MediaSVG from "../../../../components/SVGs/MediaSVG";
import GIFSVG from "../../../../components/SVGs/GIFSVG";
import PollSVG from "../../../../components/SVGs/PollSVG";
import EmojiSVG from "../../../../components/SVGs/EmojiSVG";
import ScheduleSVG from "../../../../components/SVGs/ScheduleSVG";
import LocationSVG from "../../../../components/SVGs/LocationSVG";
import { FeedPostCreatorProgress } from "../FeedPostCreatorProgress/FeedPostCreatorProgress";

export const FeedPostCreator: React.FC = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [active, setActive] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<string>("");

  const activate = () => {
    if (!active) setActive(true);
    if (textAreaRef && textAreaRef.current) textAreaRef.current.focus();
  };

  const autoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = "25px";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  };
  return (
    <div className="feed-post-creator" onClick={activate}>
      <Link to="">
        <img
          className="feed-post-creator-pfp"
          src="https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg"
        />
      </Link>
      <div className="feed-post-creator-right">
        <div
          className={
            active
              ? "feed-post-creator-audience"
              : "feed-post-creator-audience hide"
          }
        >
          Everyone
          <ExpandMore
            sx={{
              fontSize: "22px",
            }}
          />
        </div>
        <textarea
          className={
            active
              ? "feed-post-creator-input input-active"
              : "feed-post-creator-input"
          }
          placeholder="What is happening?!"
          ref={textAreaRef}
          onChange={autoGrow}
          cols={50}
          maxLength={256}
        />
        <div
          className={
            active ? "feed-post-creator-reply" : "feed-post-creator-reply hide"
          }
        >
          <GlobeSVG height={14} width={14} color={"#1da1f2"} />
          Everyone can reply
        </div>
        <div
          className={
            active
              ? "feed-post-creator-bottom-icons icon-border"
              : "feed-post-creator-bottom-icons"
          }
        >
          <div className="feed-post-creator-bottom-icons-left">
            <div className="feed-post-creator-icon-bg">
              <MediaSVG height={20} width={20} color={"#1da1f2"} />
            </div>
            <div className="feed-post-creator-icon-bg">
              <GIFSVG height={20} width={20} color={"#1da1f2"} />
            </div>
            <div className="feed-post-creator-icon-bg">
              <PollSVG height={20} width={20} color={"#1da1f2"} />
            </div>
            <div className="feed-post-creator-icon-bg">
              <EmojiSVG height={20} width={20} color={"#1da1f2"} />
            </div>
            <div className="feed-post-creator-icon-bg">
              <ScheduleSVG height={20} width={20} color={"#1da1f2"} />
            </div>
            <div className="feed-post-creator-location">
              <LocationSVG
                height={20}
                width={20}
                color={"rgba(29,161,242,.5)"}
              />
            </div>
          </div>

          <div className="feed-post-creator-submit-cluster">
            {postContent !== "" ? (
              <div className="feed-post-creator-cluster-left">
                <FeedPostCreatorProgress
                  percent={(postContent.length / 256) * 100}
                />
                <span className="feed-post-creator-submit-cluster-divider"></span>
                <div className="feed-post-creator-submit-cluster-add">
                  <span>+</span>
                </div>
              </div>
            ) : (
              <></>
            )}

            <button
              className={
                postContent === ""
                  ? "feed-post-creator-post-button"
                  : "feed-post-creator-post-button post-active"
              }
              disabled={postContent === ""}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
