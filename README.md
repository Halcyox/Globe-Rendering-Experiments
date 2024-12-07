# Globe Rendering Experiments

This project demonstrates an interactive 3D globe visualization using React and Globe.gl. It creates a visually appealing header with a customizable globe, points, and arcs. Check (https://globe.gl/) for the basis of this.

## Features

- Interactive 3D globe header
- Customizable globe image
- Add points of interest on the globe
- Display arcs between points
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v12 or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
git clone https://github.com/your-username/globe-rendering-experiments.git


2. Navigate to the project directory:
cd globe-rendering-experiments

3. Install dependencies:
npm install

### Running the Application

To start the development server:
npm start

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Structure

- `src/App.js`: Main application component
- `src/GlobeHeaderDesign.js`: Globe visualization component, there are several, check App.js to change the globe you are viewing by changing the number of the referenced design
- `src/index.js`: Entry point of the React application
- `public/index.html`: HTML template

## Customization

You can customize the globe by modifying the `points` and `arcs` data in `App.js`. Adjust the globe's appearance and behavior by changing the properties in `GlobeHeader.js`.

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Globe.gl](https://globe.gl/) - A WebGL-powered 3D globe visualization library

## Learn More

To learn more about React, check out the [React documentation](https://reactjs.org/).

For more information about Globe.gl, visit the [Globe.gl documentation](https://globe.gl/docs/).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).