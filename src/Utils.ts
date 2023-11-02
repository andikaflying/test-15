
namespace TSUtilityModule {
    type User = { name: string, age: number, email: string };
    type UserInfo = Pick<T, "name" | "email">;
}