import type { Dayjs } from "dayjs";
import { Chip, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import { COLORS, FONTS } from "../../theme";

export type LabeledDatePickerProps = {
  /** Label shown above the input */
  label: string;
  /** The selected date value (controlled). */
  value: Dayjs | null;
  /** Changes when the user picks/clears a date. */
  onChange: (v: Dayjs | null) => void;
  /** The earliest date you can pick. */
  minDate?: Dayjs;
  /** Optional rule to block certain dates. */
  shouldDisableDate?: (d: Dayjs) => boolean;

  /** Usual form flags. */
  disabled?: boolean;
  readOnly?: boolean;

  /** Input width for component. */
  width?: number;

  /** Placeholder text inside the field. */
  placeholder?: string;

  /** Extra MUI props to pass through */
  slotProps?: {
    textField?: Record<string, unknown>;
  } & Record<string, unknown>;

  /** Display format shown to the user. */
  format?: string;
};

const OutlinedTF = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: 5,
    backgroundColor: COLORS.white,
    "& .MuiOutlinedInput-notchedOutline": { borderColor: COLORS.pine },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: COLORS.pine },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: COLORS.pine,
      borderWidth: 2,
    },
  },
  "& .MuiOutlinedInput-input": { fontFamily: FONTS.sans },
  "& .MuiSvgIcon-root": { color: COLORS.pine },
});

/**
 * Date picker with a small chip label above it.
 * Styled to match the rest of the app.
 *
 * @param props Component props
 * @returns A labeled date picker
 */
export default function LabeledDatePicker({
  label,
  value,
  onChange,
  minDate,
  shouldDisableDate,
  disabled,
  readOnly,
  width = 150,
  placeholder = "DD/MM/YY",
  slotProps,
  format = "DD/MM/YY",
}: LabeledDatePickerProps) {
  const mergedSlotProps = {
    textField: {
      size: "small",
      placeholder,
      variant: "outlined",
      sx: { width },
      ...(slotProps?.textField ?? {}),
    },
    ...(slotProps ?? {}),
  };

  // Layout with chip on top and field below
  return (
    <Stack spacing={0.5} sx={{ minWidth: width }}>
      <Chip
        label={label}
        size="small"
        variant="outlined"
        sx={{
          alignSelf: "flex-start",
          bgcolor: COLORS.mint,
          border: `1px solid ${COLORS.mint}`,
          color: COLORS.pine,
          fontFamily: FONTS.sans,
          height: 24,
        }}
      />
      <DatePicker
        value={value}
        onChange={onChange}
        minDate={minDate}
        shouldDisableDate={shouldDisableDate}
        disabled={disabled}
        readOnly={readOnly}
        format={format}
        enableAccessibleFieldDOMStructure={false}
        slots={{ textField: OutlinedTF }}
        slotProps={mergedSlotProps}
      />
    </Stack>
  );
}
