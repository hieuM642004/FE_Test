"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, TextField } from "@mui/material";
import { debounce } from "@/utils/debounce";
import React from "react";

interface ProductFiltersProps {
  onFilterChange: (searchQuery: string, priceRange: number[]) => void;
}

export default React.memo(function ProductFilters({
  onFilterChange,
}: ProductFiltersProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000]);

  const debouncedFilterChange = useMemo(
    () =>
      debounce(() => {
        onFilterChange(searchQuery, priceRange);
      }, 500),
    [searchQuery, priceRange, onFilterChange]
  );

  useEffect(() => {
    debouncedFilterChange();
    return () => debouncedFilterChange.cancel();
  }, [searchQuery, priceRange, debouncedFilterChange]);

  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <TextField
        label="Search products"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ width: "50%" }}
      />
    </Box>
  );
});
