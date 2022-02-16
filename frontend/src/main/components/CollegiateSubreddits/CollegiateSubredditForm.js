import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'


function CollegiateSubredditForm({ initialSubredditName, submitAction, buttonLabel="Create" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialSubredditName || {}, }
    );
    // Stryker enable all

    // For explanation, see: https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
    // Note that even this complex regex may still need some tweaks

    const name = String();
    const location = String();
    const subreddit = String();

    return (

        <Form onSubmit={handleSubmit(submitAction)}>

            {initialUCSBDate && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control
                        data-testid="UCSBDateForm-id"
                        id="id"
                        type="text"
                        {...register("id")}
                        value={initialUCSBDate.id}
                        disabled
                    />
                </Form.Group>
            )}

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="quarterYYYYQ">Quarter YYYYQ</Form.Label>
                <Form.Control
                    data-testid="UCSBDateForm-quarterYYYYQ"
                    id="quarterYYYYQ"
                    type="text"
                    isInvalid={Boolean(errors.quarterYYYYQ)}
                    {...register("quarterYYYYQ", { required: true, pattern: yyyyq_regex })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.quarterYYYYQ && 'QuarterYYYYQ is required. '}
                    {errors.quarterYYYYQ?.type === 'pattern' && 'QuarterYYYYQ must be in the format YYYYQ, e.g. 20224 for Fall 2022'}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                    data-testid="UCSBDateForm-name"
                    id="name"
                    type="text"
                    isInvalid={Boolean(errors.name)}
                    {...register("name", {
                        required: "Name is required."
                    })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label htmlFor="localDateTime">Date (iso format)</Form.Label>
                <Form.Control
                    data-testid="UCSBDateForm-localDateTime"
                    id="localDateTime"
                    type="text"
                    isInvalid={Boolean(errors.localDateTime)}
                    {...register("localDateTime", { required: true, pattern: isodate_regex })}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.localDateTime && 'LocalDateTime is required. '}
                    {errors.localDateTime?.type === 'pattern' && 'localDateTime must be in ISO format, e.g. 2022-01-02T15:30'}
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                type="submit"
                data-testid="UCSBDateForm-submit"
            >
                {buttonLabel}
            </Button>
            <Button
                variant="Secondary"
                onClick={() => navigate(-1)}
                data-testid="UCSBDateForm-cancel"
            >
                Cancel
            </Button>

        </Form>

    )
}

export default UCSBDateForm;