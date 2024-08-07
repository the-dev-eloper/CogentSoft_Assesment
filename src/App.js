import { useState } from "react";
import "./App.css";
import { StonePaperScissors } from "./utils/StonePaperScissor";
import StarRating from "./utils/StarRating";

function App() {
  const [finalArray, setFinalArray] = useState([]);
  const [intersectionArray, setIntersectionArray] = useState([]);
  const [isAnagramstring, setIsAnagramString] = useState(false);
  const [adderSum, setAdderSum] = useState(0);

  const mergeArrays = (arr1, arr2) => {
    const mergedArray = [];
    let i = 0;
    let j = 0;

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] < arr2[j]) {
        mergedArray.push(arr1[i]);
        i++;
      } else {
        mergedArray.push(arr2[j]);
        j++;
      }
    }

    while (i < arr1.length) {
      mergedArray.push(arr1[i]);
      i++;
    }

    while (j < arr2.length) {
      mergedArray.push(arr2[j]);
      j++;
    }

    setFinalArray(mergedArray);
  };

  const intersectSortedArrays = (arr1, arr2) => {
    const intersectedElements = arr1.filter((ele1) =>
      arr2.some((ele2) => ele1 === ele2)
    );
    setIntersectionArray(intersectedElements);
  };

  const isAnagram = (str1, str2) => {
    if (str1.length !== str2.length) {
      setIsAnagramString(false);
    }

    const sortedStr1 = str1.split("").sort().join("");
    const sortedStr2 = str2.split("").sort().join("");

    setIsAnagramString(sortedStr1 === sortedStr2);
  };

  const handleCurrying = () => {
    console.log(sum(1)(2)(3)());
  };

  const sum = (firstNumber) => {
    let accumulator = firstNumber;
    return function adder(nextNumber) {
      if (nextNumber === undefined) {
        return accumulator;
      }

      accumulator += nextNumber;
      setAdderSum(adder);
    };
  };

  const polyfillPromise = () => {
    const firsrPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Resolved First after 1 second");
      }, 1000);
    });

    const secondPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Resolved First after 2 seconds");
      }, 2000);
    });

    const thirdPromise = "Resolved directly";

    try {
      let endPromise = Promise.all([firsrPromise, secondPromise, thirdPromise]);
      endPromise.then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }

    // Polyfill for Promise Series

    let promises = [firsrPromise, secondPromise, thirdPromise];

    return promises.reduce((accumulator, currentPromise) => {
      return accumulator.then((results) => {
        return Promise.resolve(currentPromise).then((result) => {
          return [...results, result];
        });
      });
    }, Promise.resolve([]));
  };

  const handleResize = debounce(() => {
    console.log("Window resized");
  }, 500);

  function debounce(func, delay) {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  const handleScroll = throttle(() => {
    console.log("Scroll event");
  }, 1000);

  function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function (...args) {
      if (!lastRan) {
        func.apply(this, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if (Date.now() - lastRan >= limit) {
            func.apply(this, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }

  return (
    <div className="App">
      <div className="merge_arrays">
        <h3>Merge Sorted Array</h3>
        <button onClick={() => mergeArrays([1, 3, 5, 7], [2, 4, 6, 8])}>
          Merge Array
        </button>
        {finalArray.length > 0 ? (
          <div>The final output array is [{finalArray}]</div>
        ) : null}
      </div>

      <div className="intersection_arrays">
        <h3>Intersection of Sorted Array</h3>
        <button
          onClick={() => intersectSortedArrays([1, 2, 4, 5, 6], [2, 4, 6, 8])}
        >
          Find Intersection
        </button>
        {intersectionArray.length > 0 ? (
          <div>The final output array is [{intersectionArray}]</div>
        ) : null}
      </div>

      <div className="intersection_arrays">
        <h3>Check Anagram String</h3>
        <button onClick={() => isAnagram("Madam Curie", "Radium Came")}>
          Check Anagram
        </button>
        <div>
          The given strings are {isAnagramstring ? "Anagram" : "Not Aanagram"}
        </div>
      </div>

      <div className="currying_sum">
        <h3>Currying</h3>
        <button onClick={handleCurrying}>Curry Function sum(1)(2)(3)</button>
        {adderSum && <div>The sum of curry function is {adderSum}</div>}
      </div>

      <div className="polyfill_promise">
        <h3>Polyfill for promise </h3>
        <button onClick={polyfillPromise}>Try Polyfill for Promise</button>
      </div>

      <div className="debounce_throttle">
        <h3>Debounce</h3>
        <button
          onClick={() => {
            window.addEventListener("resize", handleResize);
          }}
        >
          Try Debounce
        </button>

        <h3>Throttle</h3>
        <button
          onClick={() => {
            window.addEventListener("scroll", handleScroll);
          }}
        >
          Try Debounce
        </button>
      </div>

      <div className="stone_paper_scissor">
        <StonePaperScissors />
      </div>

      <div className="stone_paper_scissor">
        <h3>Star Rating</h3>
        <StarRating />
      </div>
    </div>
  );
}

export default App;
