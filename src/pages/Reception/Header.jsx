import ministryLogo from '../../images/Health.png';
import listItem from '../../images/list.png'

const Header = () => {
  return (
    <section className="grid grid-cols-3 place-items-center items-center bg--400">
      <div className="bg--500 h-[200px] w-[200px] grid place-items-center">
        <img
          src={ministryLogo}
          alt="logo for ministry of health"
          className="w-[75%]"
        />
      </div>
      <div className='bg--500 p-4'>
        <h1 className="font-amiri text-5xl">عيادة الامراض المزمنة</h1>
      </div>
      <div>
        <button>
          <img src={listItem} alt="list item icon" />
        </button>
      </div>
    </section>
  );
};

export default Header;
