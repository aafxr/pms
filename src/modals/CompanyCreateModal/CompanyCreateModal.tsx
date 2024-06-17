import React, {useState, ChangeEvent} from 'react';
import {Input, Modal, Select} from "../../components";
import {UR_Company} from "../../core/classes/Company";
import clsx from "clsx";
import {Accordion} from "../../components/Accordion";


export type ModalStateType = {
    companyName: string
    directorFIO: string
    directorPhone: string
    country: string
    logo: Blob | undefined
    company: UR_Company
}

const defaultState: ModalStateType = {
    companyName: '',
    directorFIO: '',
    directorPhone: '',
    country: '',
    company: new UR_Company(),
    logo: undefined
}

export interface CompanyCreateModal {
    open?: boolean
    className?: string
    onCreate?: (company: ModalStateType) => unknown
    onCancel?: () => unknown
    onClose?: () => unknown
}

export function CompanyCreateModal({
                                       open,
                                       className,
                                       onCreate,
                                       onClose,
                                       onCancel
                                   }: CompanyCreateModal) {
    const [state, setState] = useState(defaultState)
    const [requizitesOpen, setRequizitesOpen] = useState(true)




    function handleCompanyNameChange(e: ChangeEvent<HTMLInputElement>){
        const companyName = e.target.value.trim()
        setState({...state, companyName})
    }



    return (
        <Modal open className={clsx('companyCreate',className)} onClose={onClose}>
            <div className='companyCreate-inner'>
                <h2 className='companyCreate-title title'>Создание компании</h2>
                <div className='companyCreate-name'>
                    <div className='companyCreate-label label'>Название компании</div>
                    <Input className={'companyCreate-input'} value={state.companyName}
                           onChange={handleCompanyNameChange} placeholder={'Название компании'}/>
                </div>

                <div className='companyCreate-directo'>
                    <div className='companyCreate-director-fio'>
                        <div className='companyCreate-label label'>ФИО руководителя</div>
                        <Input className={'companyCreate-input'} value={state.companyName}
                               onChange={handleCompanyNameChange} placeholder={'ФИО руководителя'}/>
                    </div>

                    <div className='companyCreate-directore-phone'>
                        <div className='companyCreate-label label'>Телефон</div>
                        <Input className={'companyCreate-input'} value={state.companyName}
                               onChange={handleCompanyNameChange} placeholder={'Телефон'}/>
                    </div>
                </div>

                <div className='companyCreate-country'>
                    <div className='companyCreate-label label'>Страна</div>
                    <Input className={'companyCreate-input'} value={state.companyName}
                           onChange={handleCompanyNameChange} placeholder={'Страна'}/>
                </div>

                <div className='companyCreate-logo'>
                    <div className='companyCreate-label label'>Вложения</div>
                    <Input className={'companyCreate-input'} value={state.companyName}
                           onChange={handleCompanyNameChange} placeholder={'Вложения'}/>
                </div>

                <Accordion className='companyCreate-requizites' title={'Реквизиты компании'} open={requizitesOpen}
                           onOpenChanged={() => setRequizitesOpen(!requizitesOpen)}>
                    <div className='companyCreate-inn'>
                        <div className='companyCreate-label label'>ИНН*</div>
                        <Input className={'companyCreate-input'} value={state.company.INN}
                               onChange={handleCompanyNameChange} placeholder={'ИНН*'}/>
                    </div>

                    <div className='companyCreate-kpp'>
                        <div className='companyCreate-label label'>КПП</div>
                        <Input className={'companyCreate-input'} value={state.company.KPP}
                               onChange={handleCompanyNameChange} placeholder={'КПП'}/>
                    </div>

                    <div className='companyCreate-ogrn'>
                        <div className='companyCreate-label label'>ОГРНИП/ОГРН</div>
                        <Input className={'companyCreate-input'} value={state.company.OGRN}
                               onChange={handleCompanyNameChange} placeholder={'ОГРНИП/ОГРН'}/>
                    </div>

                    <div className='companyCreate-ogrn-date'>
                        <div className='companyCreate-label label'>Дата выдачи ОГРНИП/ОГРН</div>
                        <Input className={'companyCreate-input'}
                               value={state.company.OGRN_date.toLocaleDateString(navigator.language, {
                                   day: "2-digit",
                                   month: '2-digit',
                                   year: 'numeric'
                               })}
                               onChange={handleCompanyNameChange} placeholder={'Дата выдачи ОГРНИП/ОГРН '}/>
                    </div>

                    <div className='companyCreate-registration-date'>
                        <div className='companyCreate-label label'>Дата регистрации</div>
                        <Input className={'companyCreate-input'}
                               value={state.company.created_at.toLocaleTimeString(navigator.language, {
                                   day: "2-digit",
                                   month: '2-digit',
                                   year: 'numeric'
                               })}
                               onChange={handleCompanyNameChange} placeholder={'Дата регистрации'}/>
                    </div>

                    <div className='companyCreate-ur-address'>
                        <div className='companyCreate-label label'>Юридический адрес</div>
                        <Input className={'companyCreate-input'} value={state.company.}
                               onChange={handleCompanyNameChange} placeholder={'Юридический адрес'}/>
                    </div>

                    <div className='companyCreate-fiz-address'>
                        <div className='companyCreate-label label'>Фактический адрес</div>
                        <Input className={'companyCreate-input'} value={state.company.OGRN}
                               onChange={handleCompanyNameChange} placeholder={'Фактический адрес'}/>
                    </div>

                    <div className='companyCreate-tax'>
                        <div className='companyCreate-label label'>Система налогооблажения</div>
                        <Select></Select>
                    </div>

                </Accordion>

            </div>
        </Modal>
    );
}
