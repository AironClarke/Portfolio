import FileManager from 'src/files/FileManager';
import '../css/heroFeature/heroFeature.css';
import Taskbar from 'src/components/system/taskbar';

const HeroFeature = (): JSX.Element => {
  return (
    <section className="heroContainer">
      <h1>Hello, world!</h1>;
      <FileManager />
      <Taskbar />
    </section>
  );
};

export default HeroFeature;
