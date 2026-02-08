import ChangePasswordForm from '../_components/ChangePasswordForm/ChangePasswordForm'

export default function ChangePasswordPage() {
  return (
    <div className="container mx-auto px-4 py-8 h-screen">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8">Change Password</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  )
}