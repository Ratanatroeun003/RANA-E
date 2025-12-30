import { TbBrandMeta } from 'react-icons/tb';
import { IoLogoInstagram } from 'react-icons/io5';
import { RiTwitterXLine } from 'react-icons/ri';

const Topbar = () => {
  return (
    <div className="bg-red-600 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 text-sm">
        <div className="hidden md:flex items-center space-x-4">
          <a href="/">
            <TbBrandMeta className="size-4" />
          </a>
          <a href="">
            <IoLogoInstagram className="size-4" />
          </a>
          <a href="">
            <RiTwitterXLine className="size-4" />
          </a>
        </div>
        <div className="flex-grow text-center">
          We ship worldwild -fast and reliable shipping
        </div>
        <div className=" hidden md:block">
          <a href="tel:+855 714407205">(+855)714407205</a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
