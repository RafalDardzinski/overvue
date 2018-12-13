import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// register FontAwesome icons here
import { 
  faUserSecret, faFilter, faFileDownload
} from '@fortawesome/free-solid-svg-icons';
library.add(faUserSecret, faFilter, faFileDownload);

export default FontAwesomeIcon;