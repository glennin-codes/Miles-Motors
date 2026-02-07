import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./socialFlow.css";
import {
  faFacebook,
  faTwitter,
  faWhatsapp,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

export default function SocialFlow() {
  return (
    <nav>
      <ul>
        <li>
          <a
            href="https://facebook.com/MillesMotorsLtd"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i>
              <FontAwesomeIcon icon={faFacebook} className="icon" />
            </i>
          
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/@miles_motors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i>
              <FontAwesomeIcon icon={faTwitter} className="icon" />
            </i>
            
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/milesmotorsltd/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i>
              <FontAwesomeIcon icon={faInstagram} className="icon" />
            </i>
            
          </a>
        </li>
        <li>
          <a
            href="https://wa.me/254722354459"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i>
              <FontAwesomeIcon icon={faWhatsapp} className="icon" />
            </i>
            
          </a>
        </li>
      </ul>
    </nav>
  );
}
