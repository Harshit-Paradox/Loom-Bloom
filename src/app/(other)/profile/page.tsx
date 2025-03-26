"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, MapPin, CreditCard, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Validation schemas
const nameSchema = z.object({
  name: z.string().min(1, "Full name is required").max(100),
});

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

const addressSchema = z.object({
  address: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    pinCode: z
      .number()
      .positive("PinCode must be positive")
      .min(10000, "PinCode must have 5 digits")
      .max(999999, "PinCode must have at most 6 digits"),
  }),
});

export type NameInput = z.infer<typeof nameSchema>;
export type PasswordInput = z.infer<typeof passwordSchema>;
export type AddressInput = z.infer<typeof addressSchema>;

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Mock user data - replace with actual user data from your API
  const user = {
    email: "user@example.com",
    name: "John Doe",
    address: [
      {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        country: "USA",
        pinCode: 10001,
      },
    ],
  };

  const nameForm = useForm<NameInput>({
    resolver: zodResolver(nameSchema),
    defaultValues: { name: user.name || "" },
  });

  const passwordForm = useForm<PasswordInput>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "", passwordConfirm: "" },
  });

  const addressForm = useForm<AddressInput>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: user.address[0] || {
        street: "",
        city: "",
        state: "",
        country: "",
        pinCode: 0,
      },
    },
  });

  const onNameSubmit = async (values: NameInput) => {
    try {
      // Replace with your API call
      // await updateUser({ name: values.name })
      toast({
        title: "Success",
        description: "Name updated successfully!",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update name",
        variant: "destructive",
      });
    }
  };

  const onPasswordSubmit = async (values: PasswordInput) => {
    try {
      // Replace with your API call
      // await updateUser({ password: values.password })
      toast({
        title: "Success",
        description: "Password updated successfully!",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password",
        variant: "destructive",
      });
    }
  };

  const onAddressSubmit = async (values: AddressInput) => {
    try {
      // Replace with your API call
      // await updateUser({ address: values.address })
      toast({
        title: "Success",
        description: "Address updated successfully!",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update address",
        variant: "destructive",
      });
    }
  };

  return (
    <main>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Account</h1>
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel Editing" : "Edit Profile"}
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList>
            <TabsTrigger value="profile" className="space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            {/* <TabsTrigger value="order" className="space-x-2">
              <Package className="h-4 w-4" />
              <span>Orders</span>
            </TabsTrigger> */}
            <TabsTrigger value="addresses" className="space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Addresses</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="space-x-2">
              <CreditCard className="h-4 w-4" />
              <span>Payment Methods</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Section */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {!isEditing ? "Full Name" : "Update Name"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...nameForm}>
                    <form
                      onSubmit={nameForm.handleSubmit(onNameSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={nameForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name:</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="John Doe"
                                disabled={!isEditing}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      {isEditing && <Button type="submit">Update Name</Button>}
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Password Section */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {!isEditing ? "Password" : "Update Password"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...passwordForm}>
                    <form
                      onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                      className="space-y-4"
                    >
                      {isEditing ? (
                        <>
                          <FormField
                            control={passwordForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>New Password:</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="password"
                                    placeholder="********"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={passwordForm.control}
                            name="passwordConfirm"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm Password:</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="password"
                                    placeholder="********"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <Button type="submit">Update Password</Button>
                        </>
                      ) : (
                        <FormField
                          control={passwordForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password:</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="password"
                                  placeholder="********"
                                  disabled
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      )}
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Address Section */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>
                    {!isEditing ? "Address" : "Update Address"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...addressForm}>
                    <form
                      onSubmit={addressForm.handleSubmit(onAddressSubmit)}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={addressForm.control}
                          name="address.street"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Street:</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="123 Main St"
                                  disabled={!isEditing}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={addressForm.control}
                          name="address.city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City:</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="City Name"
                                  disabled={!isEditing}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={addressForm.control}
                          name="address.state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State:</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="State Name"
                                  disabled={!isEditing}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={addressForm.control}
                          name="address.country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country:</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Country Name"
                                  disabled={!isEditing}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={addressForm.control}
                          name="address.pinCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pin Code:</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  placeholder="123456"
                                  disabled={!isEditing}
                                  onChange={(e) =>
                                    field.onChange(Number(e.target.value))
                                  }
                                  value={field.value || ""}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      {isEditing && (
                        <Button type="submit">Update Address</Button>
                      )}
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardContent className="text-center py-6">
                <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium">No orders yet</p>
                <p className="text-muted-foreground mb-4">
                  When you place an order, it will appear here
                </p>
                <Button>Start Shopping</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses">
            <Card>
              <CardContent className="text-center py-6">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium">Coming Soon</p>
                <p className="text-muted-foreground">
                  Multiple address management will be available soon
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card>
              <CardContent className="text-center py-6">
                <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium">Coming Soon</p>
                <p className="text-muted-foreground">
                  Payment method management will be available soon
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
