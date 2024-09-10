/*
// Add fontawesome icons
*/

// Import the svg core
import { library, dom } from '@fortawesome/fontawesome-svg-core'

// To keep the package size as small as possible we only import icons we use

// Import the icons from the free solid package.
import {
  faRotateLeft,
  faRotateRight,
  faArrowTurnDown,
  faMinimize,
  faMaximize,
} from '@fortawesome/free-solid-svg-icons'

// Add the icons to the library for replacing <i class="fa-solid fa-sort"></i> with the intended svg.
library.add(
  // Solid
  faRotateLeft,
  faRotateRight,
  faArrowTurnDown,
  faMinimize,
  faMaximize,
)
dom.i2svg()
