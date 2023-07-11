import axios from "axios";
import { IStudent } from "./studentService";

export interface IBook {
  code: string;
  title: string;
  author: string;
  description: string;
  issuedTo: IStudent | null;
}

type FetchBooksResponse = {
  books: IBook[];
};
type AddBookResponse = {
  book?: IBook;
  message: string;
};
type DeleteBookResponse = {
  message: string;
};
type UpdateBookResponse = {
  data?: IBook;
  message: string;
};
type ReturnBookResponse = {
  book?: IBook;
  message: string;
};
type IssueBookResponse = {
  book?: IBook;
  message: string;
};

const apiURL = "https://college-library-api.onrender.com/api/v1/books";

export const fetchBooks = async () => {
  console.log("books data loaded");
  try {
    const { data } = await axios.get<FetchBooksResponse>(apiURL);
    const books = data.books;
    console.log(books);
    return books;
  } catch (err) {
    console.log("failed to fetch books from api");
  }
};

export const addBook = async (book: IBook) => {
  try {
    const { data } = await axios.post<AddBookResponse>(apiURL, book);
    if (data.book) return data.book;
    else console.log("failed to add book");
  } catch (err) {
    console.log("failed to add book");
  }
};

export const deleteBook = async (book: IBook) => {
  const deleteURL = apiURL + "/" + book.code;
  try {
    const { data } = await axios.delete<DeleteBookResponse>(deleteURL);
    if (data.message === "Book deleted successfully") return true;
  } catch (err) {
    console.log("failed to call api");
  }
  return false;
};

export const updateBook = async (book: IBook) => {
  const updateURL = apiURL + "/" + book.code;
  try {
    const { data } = await axios.patch<UpdateBookResponse>(updateURL, book);
    if (data.message === "Book updated successfully") return data.data;
  } catch (err) {
    console.log("failed to call api");
  }
};

export const returnBook = async (book: IBook) => {
  const returnURL = apiURL + "/" + book.code + "/return";
  try {
    const { data } = await axios.patch<ReturnBookResponse>(returnURL);
    if (data.message === "Book returned successfully") return true;
  } catch (err) {
    console.log("failed to call api");
  }
  return false;
};

export const issueBook = async (book: IBook, student: IStudent) => {
  const issueURL = apiURL + "/" + book.code + "/issue";
  try {
    const { data } = await axios.patch<IssueBookResponse>(issueURL, {
      studentID: student.studentID,
    });
    if (data.message === "Book issued successfully") return true;
  } catch (err) {
    console.log("failed to call api");
  }
  return false;
};

export const dummyBooks: IBook[] = [
  {
    code: "abcdefgh",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "A classic novel set in the American South. It explores themes of racial injustice and moral development through the eyes of the young protagonist, Scout Finch.",
    issuedTo: {
      studentID: "fe435g",
      name: "Indrayudh Ghosh",
      email: "indrayudhghosh2003@gmail.com",
      phone: "2645395876",
      books: [],
    },
  },
  {
    code: "ijklmnop",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    description:
      "Pride and Prejudice is a beloved romantic comedy of manners. It follows the lives of the Bennet sisters as they navigate societal expectations, love, and marriage in 19th-century England.",
    issuedTo: null,
  },
  {
    code: "qrstuvwx",
    title: "1984",
    author: "George Orwell",
    description:
      "1984 is a dystopian novel that depicts a totalitarian regime where individuality and independent thinking are suppressed. It serves as a cautionary tale, warning against the dangers of government surveillance and manipulation.",
    issuedTo: null,
  },
  {
    code: "yzabcdef",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "The Great Gatsby is a literary masterpiece that explores the decadence, illusion, and tragedy of the American Dream. Through the eyes of Nick Carraway, the reader is immersed in the opulent world of Jay Gatsby and the complexities of his pursuit of love and success.",
    issuedTo: null,
  },
  {
    code: "ghijklmn",
    title: "Moby Dick",
    author: "Herman Melville",
    description:
      "Moby Dick is an epic sea adventure that follows Captain Ahab's relentless quest for revenge against the white whale that took his leg. It delves into themes of obsession, fate, and the human struggle against nature.",
    issuedTo: null,
  },
  {
    code: "opqrstuv",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    description:
      "The Catcher in the Rye is a coming-of-age novel that captures the disillusionment and angst of its teenage protagonist, Holden Caulfield. It explores themes of identity, alienation, and the loss of innocence.",
    issuedTo: null,
  },
  {
    code: "wxyzabcd",
    title: "To the Lighthouse",
    author: "Virginia Woolf",
    description:
      "To the Lighthouse is a modernist novel that experiments with stream-of-consciousness narrative techniques. It delves into the thoughts, emotions, and relationships of its characters as they navigate personal and societal changes.",
    issuedTo: null,
  },
  {
    code: "efghijkl",
    title: "Brave New World",
    author: "Aldous Huxley",
    description:
      "Brave New World presents a dystopian future where society is engineered for stability and conformity, but at the cost of individual freedom and genuine human connection. It raises questions about the price of utopia.",
    issuedTo: null,
  },
  {
    code: "mnopqrst",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    description:
      "The Lord of the Rings is a high fantasy trilogy set in the fictional world of Middle-earth. It follows the quest of a diverse group of characters to destroy the One Ring and defeat the Dark Lord Sauron.",
    issuedTo: null,
  },
  {
    code: "uvwxyzab",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "A classic novel set in the American South. It explores themes of racial injustice and moral development through the eyes of the young protagonist, Scout Finch.",
    issuedTo: null,
  },
  {
    code: "cdefghij",
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    description:
      "The first book in the Harry Potter series, it introduces the magical world of Hogwarts School of Witchcraft and Wizardry. Follow Harry Potter's journey as he discovers his true identity and battles the dark wizard Lord Voldemort.",
    issuedTo: null,
  },
  {
    code: "klmnopqr",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    description:
      "The Hobbit is a fantasy novel that serves as a prequel to The Lord of the Rings. Join Bilbo Baggins on his unexpected adventure as he accompanies a group of dwarves in their quest to reclaim their homeland from the dragon Smaug.",
    issuedTo: null,
  },
  {
    code: "stuvwxyz",
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    description:
      "Jane Eyre is a classic novel that follows the life of its eponymous protagonist. It explores themes of love, independence, and social class, as Jane navigates her challenging journey to find her place in the world.",
    issuedTo: null,
  },
  {
    code: "bcdefghi",
    title: "The Alchemist",
    author: "Paulo Coelho",
    description:
      "The Alchemist is a philosophical novel that tells the story of a young Andalusian shepherd named Santiago. It is a tale of self-discovery, dreams, and the pursuit of one's personal legend.",
    issuedTo: null,
  },
];
