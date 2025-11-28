import { Box, Card, CardContent, Chip, LinearProgress, Stack, Typography } from "@mui/material";

export function ProfileCard({ name, city, score, stacks }: {name: string, city: string, score: number, stacks:string[]}) {
  return (
    <Card sx={{ p: 2, display: "flex", gap: 2, alignItems: "center" }}>

      <CardContent sx={{ flex: 1, p: "0 !important" }}>
        <Stack spacing={0.5}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {city}
          </Typography>

          <Box>
            <Typography variant="caption">Match: {(score * 100).toFixed(0)}%</Typography>
            <LinearProgress variant="determinate" value={score * 100} />
          </Box>

          <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
            {stacks?.map((stack) => (
              <Chip key={stack} label={stack} size="small" />
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}