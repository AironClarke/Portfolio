import FileManager from 'src/files/FileManager';
import '../css/heroFeature.css';
import Taskbar from 'src/components/system/taskbar';
import TestFolder from 'src/folders/TestFolder';

const HeroFeature = (): JSX.Element => {
  return (
    <section className="heroContainer">
      <h1>Hello, world!</h1>;
      <FileManager />
      <TestFolder />
      <Taskbar />
    </section>
  );
};

export default HeroFeature;
