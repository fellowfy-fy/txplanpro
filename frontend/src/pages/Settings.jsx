import Tile from "../components/Tile";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const handleClick = (tile) => {
    navigate(`/settings/${tile}`);
  };

  return (
    <div className="ml-10 bg-white rounded-3xl w-[95%]">
      <div className="p-[24px]">
        <h1 className="font-medium text-gray-500 opacity-80 mb-4">
          Upload Your clinic specific photos and information to be used in Your
          treatment plans templates
        </h1>
        <h1 className="text-5xl font-medium mb-4">
          dr. JOHN DOE, Smile-clinic Ltd.
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Tile
            title="Clinic Photos"
            description="Interior and exterior photos of clinic"
            onClick={() => handleClick("clinic_logo_and_photos")}
          />
          <Tile
            title="Static Texts"
            description="Describe your clinic and your care"
            onClick={() => handleClick("static_texts")}
          />
          {/* Add more tiles as needed */}
        </div>
      </div>
    </div>
  );
};

export default Settings;
