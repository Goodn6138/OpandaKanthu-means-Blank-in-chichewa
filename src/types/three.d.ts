declare module 'three/examples/jsm/loaders/STLLoader' {
  import { BufferGeometry } from 'three';
  export class STLLoader {
    load(url: string, onLoad: (geometry: BufferGeometry) => void): void;
  }
}
