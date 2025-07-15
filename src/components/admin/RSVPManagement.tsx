import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Trash2, UserCheck, Search, Calendar, Users, Check, X, Mail, Phone } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RSVPManagement = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [attendanceFilter, setAttendanceFilter] = useState("all");
  const [filteredResponses, setFilteredResponses] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    loadResponses();
  }, []);

  useEffect(() => {
    // Filter responses based on search term and attendance
    let filtered = responses;

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (response) =>
          response.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          response.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (attendanceFilter !== "all") {
      filtered = filtered.filter(
        (response) => response.attendance === attendanceFilter
      );
    }

    setFilteredResponses(filtered);
  }, [responses, searchTerm, attendanceFilter]);

  const loadResponses = async () => {
    try {
      const { data, error } = await supabase
        .from("rsvp_responses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setResponses(data || []);
    } catch (error) {
      console.error("Error loading RSVP responses:", error);
      toast({
        title: "Error",
        description: "Failed to load RSVP responses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteResponse = async (responseId) => {
    try {
      const { error } = await supabase
        .from("rsvp_responses")
        .delete()
        .eq("id", responseId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "RSVP response deleted successfully",
      });

      loadResponses();
    } catch (error) {
      console.error("Error deleting RSVP response:", error);
      toast({
        title: "Error",
        description: "Failed to delete RSVP response",
        variant: "destructive",
      });
    }
  };

  const exportResponses = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Attendance", "Guest Count", "Dietary Restrictions", "Message", "Date"],
      ...responses.map(rsvp => [
        rsvp.full_name,
        rsvp.email,
        rsvp.phone || "",
        rsvp.attendance,
        rsvp.guest_count || 0,
        rsvp.dietary_restrictions || "",
        rsvp.message || "",
        new Date(rsvp.created_at).toLocaleString()
      ])
    ];

    const csvString = csvContent.map(row => 
      row.map(field => `"${field}"`).join(",")
    ).join("\n");

    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `rsvp-responses-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "RSVP responses exported successfully",
    });
  };

  const getAttendanceBadge = (attendance) => {
    return attendance === "attending" ? (
      <Badge variant="default" className="gap-1">
        <Check className="h-3 w-3" />
        Attending
      </Badge>
    ) : (
      <Badge variant="secondary" className="gap-1">
        <X className="h-3 w-3" />
        Not Attending
      </Badge>
    );
  };

  const attendingCount = responses.filter(r => r.attendance === "attending").length;
  const notAttendingCount = responses.filter(r => r.attendance === "not-attending").length;
  const totalGuests = responses
    .filter(r => r.attendance === "attending")
    .reduce((sum, r) => sum + (r.guest_count || 0) + 1, 0); // +1 for the main guest

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>RSVP Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            Loading RSVP responses...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            RSVP Management
          </CardTitle>
          <CardDescription>
            Manage wedding RSVP responses and guest information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={attendanceFilter} onValueChange={setAttendanceFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by attendance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Responses</SelectItem>
                <SelectItem value="attending">Attending</SelectItem>
                <SelectItem value="not-attending">Not Attending</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={exportResponses} variant="outline">
              Export CSV
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-green-600">{attendingCount}</div>
                    <div className="text-sm text-muted-foreground">Attending</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <X className="h-4 w-4 text-red-600" />
                  <div>
                    <div className="text-2xl font-bold text-red-600">{notAttendingCount}</div>
                    <div className="text-sm text-muted-foreground">Not Attending</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{totalGuests}</div>
                    <div className="text-sm text-muted-foreground">Total Guests</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-2xl font-bold">{responses.length}</div>
                    <div className="text-sm text-muted-foreground">Total Responses</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest Details</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Special Requests</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResponses.map((response) => (
                  <TableRow key={response.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <UserCheck className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">{response.full_name}</div>
                          <div className="text-sm text-muted-foreground">
                            ID: {response.id.slice(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {response.email}
                        </div>
                        {response.phone && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {response.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getAttendanceBadge(response.attendance)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">
                          {(response.guest_count || 0) + 1} total
                        </div>
                        {response.guest_count > 0 && (
                          <div className="text-muted-foreground">
                            +{response.guest_count} additional
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-48">
                        {response.dietary_restrictions && (
                          <div className="text-sm">
                            <span className="font-medium">Dietary:</span>
                            <p className="text-muted-foreground line-clamp-2">
                              {response.dietary_restrictions}
                            </p>
                          </div>
                        )}
                        {response.message && (
                          <div className="text-sm mt-1">
                            <span className="font-medium">Message:</span>
                            <p className="text-muted-foreground line-clamp-2">
                              {response.message}
                            </p>
                          </div>
                        )}
                        {!response.dietary_restrictions && !response.message && (
                          <span className="text-muted-foreground text-sm">No special requests</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(response.created_at).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(response.created_at).toLocaleTimeString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete RSVP Response</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete the RSVP response from {response.full_name}? 
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => deleteResponse(response.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete Response
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredResponses.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      {searchTerm || attendanceFilter !== "all" 
                        ? "No RSVP responses match your filters." 
                        : "No RSVP responses yet."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RSVPManagement;