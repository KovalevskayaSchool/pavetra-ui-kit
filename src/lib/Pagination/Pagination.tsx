import { FC } from "react";
import cn from "classnames";
import { usePagination } from "./usePagination";
import {
  ChevronLeftOutline,
  ChevronRightOutline,
} from "@symblight/pavetra-icons";
import { Button } from "../Button";

import { useControlled } from "../../utils/useControlled";
import styles from "./Pagination.module.css";

const DOTS = "...";

// defaultCurrent={1} total={50} onChange current

export interface PaginationProps {
  total: number;
  current?: number;
  onChange?: any;
  pageSize?: number;
  defaultCurrent?: number;
  siblingCount?: number;
  className?: string;
}
export const Pagination: FC<PaginationProps> = ({
  total,
  onChange,
  defaultCurrent = 1,
  pageSize = 10,
  siblingCount = 1,
  current,
  className,
}) => {
  const [currentPage, setCurrentPage, isControlled] = useControlled(
    current,
    defaultCurrent
  );
  const paginationRange = usePagination({
    currentPage,
    totalCount: total,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  // if (current === 0 || paginationRange.length < 2) {
  //   return null;
  // }

  const onNext = () => {
    const page = currentPage ? currentPage : defaultCurrent;
    const nextPage = page + 1;
    onChange?.(nextPage);
    setCurrentPage(nextPage);
  };

  const onPrevious = () => {
    const page = currentPage ? currentPage : defaultCurrent;
    const nextPage = page - 1;
    onChange?.(nextPage);
    setCurrentPage(nextPage);
  };

  const handleChange = (page) => {
    onChange?.(page);
    setCurrentPage(page);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={cn(styles["pagination"], className)}>
      {/* Left navigation arrow */}
      <li className={cn(styles["pagination__item"])}>
        <Button
          onClick={onPrevious}
          className={styles["pagination__button"]}
          variant="inline"
          disabled={currentPage === 1}
          icon={<ChevronLeftOutline />}
        />
      </li>
      {paginationRange.map((pageNumber, i) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li
              className={cn(
                styles["pagination__item"],
                styles["pagination__item_dots"]
              )}
              key={`pag-dots-${pageNumber + i}`}
            >
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            className={cn(styles["pagination__item"], {
              selected: pageNumber === current,
            })}
            key={`page-${pageNumber}`}
          >
            <Button
              className={styles["pagination__button"]}
              onClick={() => handleChange(pageNumber)}
              variant={pageNumber === currentPage ? "ghost" : "inline"}
            >
              {pageNumber}
            </Button>
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li className={cn(styles["pagination__item"])}>
        <Button
          onClick={onNext}
          variant="inline"
          className={styles["pagination__button"]}
          disabled={currentPage === lastPage}
          icon={<ChevronRightOutline />}
        />
      </li>
    </ul>
  );
};
