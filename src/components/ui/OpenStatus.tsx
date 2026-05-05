// Path: src/components/ui/OpenStatus.tsx
'use client';

import { useState, useEffect } from 'react';
import { HOURS } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';

/**
 * Real-time open/closed status based on WIB time (UTC+7).
 * Updates every 60 seconds.
 * @returns JSX.Element
 */
export default function OpenStatus() {
  const [status, setStatus] = useState<{
    isOpen: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    const checkStatus = () => {
      // Get current time in WIB
      const nowWIB = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
      const dateWIB = new Date(nowWIB);
      
      const daysIndo = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const currentDay = daysIndo[dateWIB.getDay()];
      const currentHour = dateWIB.getHours();
      const currentMinute = dateWIB.getMinutes();

      const todaySchedule = HOURS.schedule.find((s) => s.day === currentDay);

      if (!todaySchedule || !todaySchedule.isOpen) {
        // Find next open day
        let nextOpenDay = '';
        for (let i = 1; i <= 7; i++) {
          const nextDayIndex = (dateWIB.getDay() + i) % 7;
          const nextDayName = daysIndo[nextDayIndex];
          const schedule = HOURS.schedule.find((s) => s.day === nextDayName);
          if (schedule && schedule.isOpen) {
            nextOpenDay = nextDayName;
            break;
          }
        }
        setStatus({
          isOpen: false,
          message: `Buka lagi ${nextOpenDay} pukul 09.00 WIB`,
        });
        return;
      }

      // Parse open and close times
      const [openHour, openMin] = todaySchedule.open!.split(':').map(Number);
      const [closeHour, closeMin] = todaySchedule.close!.split(':').map(Number);

      const currentTimeInMinutes = currentHour * 60 + currentMinute;
      const openTimeInMinutes = openHour * 60 + openMin;
      const closeTimeInMinutes = closeHour * 60 + closeMin;

      if (currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes) {
        setStatus({
          isOpen: true,
          message: `Tutup pukul ${todaySchedule.close!.replace(':', '.')} WIB`,
        });
      } else {
        // If closed today but will open tomorrow or later
        let nextOpenDay = 'Besok';
        if (currentTimeInMinutes >= closeTimeInMinutes) {
           // Find next open day
          for (let i = 1; i <= 7; i++) {
            const nextDayIndex = (dateWIB.getDay() + i) % 7;
            const nextDayName = daysIndo[nextDayIndex];
            const schedule = HOURS.schedule.find((s) => s.day === nextDayName);
            if (schedule && schedule.isOpen) {
              nextOpenDay = i === 1 ? 'Besok' : nextDayName;
              break;
            }
          }
        } else {
            nextOpenDay = 'Hari ini';
        }

        setStatus({
          isOpen: false,
          message: `Buka ${nextOpenDay} pukul 09.00 WIB`,
        });
      }
    };

    checkStatus();
    const intervalId = setInterval(checkStatus, 60000); // Update every 60 seconds

    return () => clearInterval(intervalId);
  }, []);

  if (!status) return null; // Avoid hydration mismatch

  return (
    <div className="flex items-center space-x-2">
      <Badge variant={status.isOpen ? 'default' : 'destructive'} className={`text-sm font-semibold ${status.isOpen ? 'bg-[#25D366] hover:bg-[#25D366]/90' : ''}`}>
        ● {status.isOpen ? 'Buka Sekarang' : 'Sedang Tutup'}
      </Badge>
      <span className="text-sm text-white font-medium">{status.message}</span>
    </div>
  );
}
