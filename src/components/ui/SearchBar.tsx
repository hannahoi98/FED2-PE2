import { useEffect, useMemo, useState, useRef } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import { COLORS } from "../../theme";

type Props = {
  /** What the user has typed. (Controlled by the parent) */
  value: string;
  /** Runs whenever the user types. */
  onChange: (next: string) => void;
  /** Gets called with the “ready” search text after a short wait. */
  onActiveQueryChange: (activeQuery: string) => void;
  /** Placeholder shown in the input. */
  placeholder?: string;
  /** Width of searchfield */
  width?: number | string;
  /** How long to wait before the search text is “ready” */
  delay?: number;
  /** Minimum letters before we treat it as a real search. */
  minLength?: number;
};

/**
 * Small search field that waits a moment before sending the value up.
 *
 * @param props Component props
 * @returns A text field with a search icon
 */
export default function SearchBar({
  value,
  onChange,
  onActiveQueryChange,
  placeholder = "Search Venues...",
  delay = 350,
  minLength = 3,
}: Props) {
  // Keep a delayed copy of the value so we don't trigger search on every keystroke.
  const [debounced, setDebounced] = useState(value);
  const timeout = useRef<number | null>(null);

  useEffect(() => {
    if (timeout.current) window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setDebounced(value), delay);
    return () => {
      if (timeout.current) window.clearTimeout(timeout.current);
    };
  }, [value, delay]);

  // Only pass a value up when it meets the minimum length.
  const activeQuery = useMemo(() => {
    const trimmed = debounced.trim();
    return trimmed.length >= minLength ? trimmed : "";
  }, [debounced, minLength]);

  // Tell the parent whenever the “ready” search text changes.
  useEffect(() => {
    onActiveQueryChange(activeQuery);
  }, [activeQuery, onActiveQueryChange]);

  const tooShort = value.trim().length > 0 && value.trim().length < minLength;

  // Render the input
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type="search"
      size="small"
      sx={{
        width: "100%",
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: COLORS.pine },
          "&:hover fieldset": { borderColor: COLORS.mint },
          "&.Mui-focused fieldset": { borderColor: COLORS.pine },
        },
        "& .MuiInputBase-input": {
          color: COLORS.pine,
          caretColor: COLORS.pine,
        },
        "& .MuiFormHelperText-root": {
          color: tooShort ? COLORS.pine : "inherit",
        },
      }}
      helperText={tooShort ? `Type at least ${minLength} letters` : undefined}
      slotProps={{
        input: {
          inputProps: { "aria-label": "Search venues" },
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
