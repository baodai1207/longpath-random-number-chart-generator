import { Controller, Get, Query } from '@nestjs/common';

interface RandomNumber {
  value: number;
  timestamp: string;
}

const history: RandomNumber[] = []; // Store generated random numbers

@Controller('random')
export class RandomController {
  @Get('history')
  getHistory(
    @Query('start') start?: string,
    @Query('end') end?: string,
  ): RandomNumber[] {
    const startTime = start ? new Date(start) : null;
    const endTime = end ? new Date(end) : null;

    return history.filter((entry) => {
      const entryTime = new Date(entry.timestamp);
      return (
        (!startTime || entryTime >= startTime) &&
        (!endTime || entryTime <= endTime)
      );
    });
  }

  // Utility to add numbers to history
  addNumberToHistory(value: number) {
    history.push({ value, timestamp: new Date().toISOString() });
  }
}
