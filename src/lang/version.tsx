import { name, styles } from '../config/console';
import { version } from '../../package.json';

const verison = (): void =>
  console.log(`%c ${name} %c ${version} `, styles.brand, styles.type);

export default verison;
