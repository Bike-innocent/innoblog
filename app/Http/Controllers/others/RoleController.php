<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::all();
        $permissions = Permission::all(); // Fetch all permissions
        return view('dashboard.create-role', compact('roles', 'permissions'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:roles',
        ]);

        $role = Role::create(['name' => $request->name]);
        if ($request->has('permissions')) {
            $role->syncPermissions($request->permissions);
        }

        return redirect()->back()->with('success', 'Role created successfully');
    }

    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => 'required|unique:roles,name,' . $role->id,
        ]);

        $role->update(['name' => $request->name]);
        $role->syncPermissions($request->permissions);

        return redirect()->back()->with('success', 'Role updated successfully');
    }

    public function destroy(Role $role)
    {
        $role->delete();
        return redirect()->back()->with('success', 'Role deleted successfully');
    }

    //assign or revoke role
    public function displayAssignRole(Request $request)
    {
        $search = $request->input('search', '');
        $users = User::with('roles');

        if ($search) {
            $users = $users->where('name', 'LIKE', "%{$search}%")
                ->orWhere('email', 'LIKE', "%{$search}%");
        }

        $users = $users->paginate(50); // Use paginate instead of get
        $roles = Role::all();

        return view('dashboard.assign-role', compact('users', 'roles', 'search'));
    }

    // Search Users with Pagination
    public function search(Request $request)
    {
        $search = $request->input('search');
        $users = User::query();

        if ($search) {
            $users = $users->where('name', 'LIKE', "%{$search}%")
                ->orWhere('email', 'LIKE', "%{$search}%");
        }

        $users = $users->with('roles')->paginate(50); // Use paginate instead of get
        $roles = Role::all();

        return view('dashboard.assign-role', compact('users', 'roles', 'search'));
    }

    public function assignRole(Request $request, User $user)
    {
        // Validate the request to ensure 'roles' is an array and each element exists in the roles table
        $request->validate([
            'roles' => 'required|array',
            'roles.*' => 'exists:roles,name',
        ]);
    
        // Sync the user's roles with the provided roles array
        $user->syncRoles($request->roles);
    
        // Redirect back with a success message
        return redirect()->back()->with('success', 'Roles assigned successfully');
    }
    
   

    public function revokeRole(Request $request, User $user)
    {
        $rolesToRevoke = $request->input('roles', []);

        foreach ($rolesToRevoke as $roleName) {
            $role = Role::where('name', $roleName)->first();
            if ($role) {
                $user->removeRole($role);
            }
        }

        return redirect()->back()->with('success', 'Roles revoked successfully.');
    }

    
    
}
