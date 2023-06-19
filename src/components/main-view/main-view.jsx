import { useState } from "react";
import { MovieCard} from "../movie-card/movie-card"
import { MovieView} from "../movie-view/movie-view"

export const MainView = () => {
  const [movies, setMovies] = useState([{
    "_id": {
      "$oid": "646dc9a474a1324822e199e9"
    },
    "Title": "Soul",
    "Genre": [
      {
        "Name": "Animation",
        "Description": "Animated film is a collection of illustrations that are photographed frame-by-frame and then played in a quick succession. Since its inception, animation has had a creative and imaginative tendency. Being able to bring animals and objects to life, this genre has catered towards fairy tales and children's stories."
      }
    ],
    "Description": "American computer-animated drama film produced by Pixar Animation Studios for Walt Disney Pictures. The film was directed by Pete Docter and co-directed by Kemp Powers, who co-wrote it with Mike Jones, and produced by Dana Murray.",
    "Director": {
      "Name": "Pete Docter",
      "Bio": "Pete Docter was born on October 9, 1968, in Bloomington, Minnesota...",
      "ImageURL": "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSVauBJMaakMIY9BLxUHXVKBc6Ij0fQvacKpBT-6av5DTf9Z7g9vxN4hiCsiHK2PsTK",
      "Birthdate": 1968
    },
    "Featured": true
  },
  {
    "_id": {
      "$oid": "646dca2c74a1324822e199ea"
    },
    "Title": "Nomadland",
    "Genre": [
      {
        "name": "Drama",
        "description": "Drama is a genre that focuses on serious storytelling and character development. It often explores complex themes, emotions, and moral dilemmas. Dramatic films typically present realistic situations and aim to evoke strong emotional responses from the audience."
      }
    ],
    "Description": "Nomadland is a 2020 American drama film...",
    "Director": {
      "Name": "Chloé Zhao",
      "Bio": "Chloé Zhao was born on March 31, 1982, in Beijing, China...",
      "ImageURL": "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcR1uJMPp_Esod9f1i9pIwTyDdBUL7C5mg5TUew0tqqB7Fxg3L2xJTb0UoLd2XZyLSbz",
      "Birthdate": 1982
    },
    "Featured": true
  },
  {
    "_id": {
      "$oid": "646dca4b74a1324822e199eb"
    },
    "Title": "Mank",
    "Genre": [
      {
        "name": "Drama",
        "description": "Drama is a genre that focuses on serious storytelling and character development. It often explores complex themes, emotions, and moral dilemmas. Dramatic films typically present realistic situations and aim to evoke strong emotional responses from the audience."
      }
    ],
    "Description": "Mank is a 2020 American biographical drama film...",
    "Director": {
      "Name": "David Fincher",
      "Bio": "David Fincher was born on August 28, 1962, in Denver, Colorado...",
      "ImageURL": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQDMJlGgpiVnMI2nsWgbnWJYSsAIqyynSn8hMUX_bwAcpyv9H-p",
      "Birthdate": 1962
    },
    "Featured": true
  },
  {
    "_id": {
      "$oid": "646dca6574a1324822e199ec"
    },
    "Title": "Minari",
    "Genre": [
      {
        "name": "Drama",
        "description": "Drama is a genre that focuses on serious storytelling and character development. It often explores complex themes, emotions, and moral dilemmas. Dramatic films typically present realistic situations and aim to evoke strong emotional responses from the audience."
      }
    ],
    "Description": "Minari has a new description",
    "Director": {
      "Name": "Lee Isaac Chung",
      "Bio": "Lee Isaac Chung was born on October 19, 1978, in Denver, Colorado...",
      "ImageURL": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT9XLP8VRa4rl4B0bPa9H_cHsGGTP50QdjB27YqQlb_fy7I3n4Q",
      "Birthdate": 1978
    },
    "Featured": true
  },
  {
    "_id": {
      "$oid": "646dca7f74a1324822e199ed"
    },
    "Title": "Promising Young Woman",
    "Genre": [
      {
        "name": "Thriller",
        "description": "Thriller is a genre that creates intense excitement, suspense, and anticipation. It often involves high stakes, danger, and unexpected plot twists. Thriller films keep the audience on the edge of their seats and typically feature suspenseful storylines and thrilling action sequences."
      }
    ],
    "Description": "Promising Young Woman is a 2020 American black comedy thriller film...",
    "Director": {
      "Name": "Emerald Fennell",
      "Bio": "Emerald Fennell was born on October 1, 1985, in Hammersmith, London...",
      "ImageURL": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT7rOIAtNGEErvvUOtxyoHkFPCxRMgb8pw0e1HqWdrvYuMDhaNV",
      "Birthdate": 1985
    },
    "Featured": true
  },
  {
    "_id": {
      "$oid": "646dca9774a1324822e199ee"
    },
    "Title": "The Trial of the Chicago 7",
    "Genre": [
      {
        "name": "Drama",
        "description": "Drama is a genre that focuses on serious storytelling and character development. It often explores complex themes, emotions, and moral dilemmas. Dramatic films typically present realistic situations and aim to evoke strong emotional responses from the audience."
      }
    ],
    "Description": "The Trial of the Chicago 7 is a 2020 American legal drama film...",
    "Director": {
      "Name": "Aaron Sorkin",
      "Bio": "Aaron Sorkin was born on June 9, 1961, in New York City, New York...",
      "ImageURL": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTF4__4De06oA6aQ0mBJenaiNf3xByv71y5684ElXio9gJJRhAm",
      "Birthdate": 1961
    },
    "Featured": true
  },
  {
    "_id": {
      "$oid": "646dcaae74a1324822e199ef"
    },
    "Genre": [
      {
        "Name": "Animation",
        "Description": "Animated film is a collection of illustrations that are photographed frame-by-frame and then played in a quick succession. Since its inception, animation has had a creative and imaginative tendency. Being able to bring animals and objects to life, this genre has catered towards fairy tales and children's stories."
      }
    ],
    "Description": "Toy Story is a 1995 American computer-animated buddy comedy film produced by Pixar Animation Studios...",
    "Director": {
      "Name": "John Lasseter",
      "Bio": "John Lasseter is an American animator, film director, screenwriter, and producer...",
      "ImageURL": "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcR7MAwpFxK7aTlf1wLwkupdRTFPYPt1h-L5ICFmTXS5XfAuqoaP5bqf8puVWwLtYaMP",
      "Birthdate": 1957
    },
    "Featured": true,
    "Title": "Toy Story"
  },
  {
    "_id": {
      "$oid": "646dcac574a1324822e199f0"
    },
    "Title": "Coco",
    "Genre": [
      {
        "Name": "Animation",
        "Description": "Animated film is a collection of illustrations that are photographed frame-by-frame and then played in a quick succession. Since its inception, animation has had a creative and imaginative tendency. Being able to bring animals and objects to life, this genre has catered towards fairy tales and children's stories."
      }
    ],
    "Description": "Coco is a 2017 American 3D computer-animated fantasy film...",
    "Director": {
      "Name": "Lee Unkrich",
      "Bio": "Lee Unkrich was born on August 8, 1967, in Cleveland, Ohio...",
      "ImageURL": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQenOp-f1zeoETh_mDGfGkUjoCr0xz3tfYNU5KbK5dV9iEh3Ltm",
      "Birthdate": 1967
    },
    "Featured": true
  },
  {
    "_id": {
      "$oid": "646dcae274a1324822e199f1"
    },
    "Title": "Inception",
    "Genre": [
      {
        "name": "Thriller",
        "description": "Thriller is a genre that creates intense excitement, suspense, and anticipation. It often involves high stakes, danger, and unexpected plot twists. Thriller films keep the audience on the edge of their seats and typically feature suspenseful storylines and thrilling action sequences."
      }
    ],
    "Description": "Inception is a 2010 science fiction action thriller film...",
    "Director": {
      "Name": "Christopher Nolan",
      "Bio": "updated Bio",
      "ImageURL": "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcS9KbgnntjGPbxTJYW_LOd8Ry7OP9fHgErMRp3J3ZQ16klJ512gEfI3hWFjUuWqqLBE",
      "Birthdate": 1970
    },
    "Featured": true
  },
  {
    "_id": {
      "$oid": "646dcb0574a1324822e199f2"
    },
    "Title": "Interstellar",
    "Genre": [
      {
        "name": "Science Fiction",
        "description": "Science Fiction is a genre that explores imaginative and futuristic concepts. It often involves advanced technology, scientific possibilities, and futuristic societies. Science fiction films often speculate on the impact of science and technology on individuals and society as a whole."
      }
    ],
    "Description": "Interstellar is a 2014 science fiction film set in a future where humanity is facing extinction...",
    "Director": {
      "Name": "Christopher Nolan",
      "Bio": "updated Bio",
      "ImageURL": "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcS9KbgnntjGPbxTJYW_LOd8Ry7OP9fHgErMRp3J3ZQ16klJ512gEfI3hWFjUuWqqLBE",
      "Birthdate": 1970
    },
    "Featured": true
  }]);
  const [selectedMovie, setSelectedMovie] = useState (null);
 
  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null) } />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
       <MovieCard
       key={movie.id}
       movie={movie}
       onMovieClick={(newSelectedMovie) => {
         setSelectedMovie(newSelectedMovie);
       }}
     />
      ))}
    </div>
          );
    };