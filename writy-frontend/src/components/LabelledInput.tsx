import { ChangeEventHandler } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface labelledInputType {
    label : string,
    placeholder : string,
    changeHandler : ChangeEventHandler,
    type? : "password" | "text" | "email"
  }
const LabelledInput = ({label, placeholder, changeHandler, type} : labelledInputType) => {
    return (
        <div>
            <Label htmlFor={label}>{label}</Label>
            <Input name={label} onChange={changeHandler} id={label} type={type} placeholder={placeholder} />
        </div>
    )
}

export default LabelledInput;