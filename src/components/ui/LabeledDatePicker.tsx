import type { Dayjs } from "dayjs";
import { COLORS, FONTS } from "../../theme";
import { Chip, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export type LabeledDatePickerProps = {
  label: string;
  value: Dayjs | null;
  onChange: (v: Dayjs | null) => void;
  minDate?: Dayjs;
  shouldDisableDate?: (d: Dayjs) => boolean;
  disabled?: boolean;
  readOnly?: boolean;
  width?: number;
  placeholder?: string;
  slotProps?: {
    textField?: Record<string, unknown>;
  } & Record<string, unknown>;
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
