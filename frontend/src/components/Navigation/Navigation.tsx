import React from "react";
import "./Navigation.css";
import "../../assets/global.css";
import { Link } from "react-router-dom";
import blueLogo from "../../assets/Twitter-logo-large.png";
import HomeSVG from "../SVGs/HomeSVG";
import ExploreSVG from "../SVGs/ExploreSVG";
import MessageSVG from "../SVGs/MessageSVG";
import NotificationSVG from "../SVGs/NotificationSVG";
import ListsSVG from "../SVGs/ListsSVG";
import ProfileSVG from "../SVGs/ProfileSVG";
import PremiumSVG from "../SVGs/PremiumSVG";
import SaveSVG from "../SVGs/SaveSVG";
import MoreSVG from "../SVGs/MoreSVG";

export const Navigation: React.FC = () => {
  return (
    <div className="navigation">
      <nav className="navigation-container">
        <Link to="/home" className="navigation-logo-bg">
          <img className="navigation-logo" src={blueLogo} />
        </Link>
        <div className="navigation-item">
          <Link to="" className="navigation-link">
            <HomeSVG height={26} width={26} />
            <p className="navigation-text navigation-active">Home</p>
          </Link>
        </div>
        <div className="navigation-item">
          <Link to="" className="navigation-link">
            <ExploreSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">Explore</p>
          </Link>
        </div>
        <div className="navigation-item">
          <Link to="" className="navigation-link">
            <ExploreSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">Explore</p>
          </Link>
        </div>
        <div className="navigation-item">
          <Link to="" className="navigation-link">
            <NotificationSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">Notifications</p>
          </Link>
        </div>
        <div className="navigation-item">
          <Link to="" className="navigation-link">
            <MessageSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">Messages</p>
          </Link>
        </div>
        <div className="navigation-item">
          <Link to="" className="navigation-link">
            <ListsSVG height={26} width={26} />
            <p className="navigation-text navigation-activeinactive">Lists</p>
          </Link>
        </div>
        <div className="navigation-item">
          <Link to="" className="navigation-link">
            <PremiumSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">Premium</p>
          </Link>
        </div>
        <div className="navigation-item">
          <Link to="" className="navigation-link">
            <SaveSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">Saved</p>
          </Link>
        </div>
        <div className="navigation-item">
          <Link to="" className="navigation-link">
            <ProfileSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">Profile</p>
          </Link>
        </div>
        <div className="navigation-item">
          <Link to="" className="navigation-link">
            <MoreSVG height={26} width={26} />
            <p className="navigation-text navigation-inactive">More</p>
          </Link>
        </div>
        <button className="navigation-post-button">Post</button>
      </nav>
      <div className="navigation-options">
        <img
          className="navigation-options-pfp"
          src="https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg"
        />
        <div className="navigation-options-info">
          <p className="navigation-options-info-display-name">Pancho</p>
          <p className="navigation-options-info-handle">@pancho</p>
        </div>
        <p className="navigation-options-dotdotdot">...</p>
      </div>
    </div>
  );
};
