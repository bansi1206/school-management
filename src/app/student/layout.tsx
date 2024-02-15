import { PrivateRouter } from "@/providers";
import { UserRole } from "@prisma/client";

export default async function LayoutManageCategory({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRouter
      roles={[UserRole.Student, UserRole.Teacher, UserRole.SuperAdmin]}
    >
      {children}
    </PrivateRouter>
  );
}
